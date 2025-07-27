export interface PerformanceMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
  INP?: number; // Interaction to Next Paint
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observer: PerformanceObserver | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.initializeObserver();
      this.measureWebVitals();
    }
  }

  private initializeObserver() {
    try {
      // Observe paint timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.FCP = Math.round(entry.startTime);
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });

      // Observe largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.LCP = Math.round(lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Observe layout shifts
      let clsValue = 0;
      let clsEntries: PerformanceEntry[] = [];
      
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsEntries.push(entry);
            clsValue += (entry as any).value;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Set CLS value on page hide
      if (typeof window !== 'undefined') {
        window.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
            this.metrics.CLS = Math.round(clsValue * 1000) / 1000;
          }
        });
      }

    } catch (e) {
      console.warn('Performance monitoring not supported:', e);
    }
  }

  private measureWebVitals() {
    if (typeof window === 'undefined') return;

    // Measure TTFB
    window.addEventListener('load', () => {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationTiming) {
        this.metrics.TTFB = Math.round(
          navigationTiming.responseStart - navigationTiming.fetchStart
        );
      }
    });

    // Measure FID (First Input Delay)
    let firstHidden = false;
    const onFirstInputDelay = (delay: number, event: Event) => {
      if (!firstHidden) {
        this.metrics.FID = Math.round(delay);
      }
    };

    const onFirstHidden = () => {
      firstHidden = true;
    };

    addEventListener('visibilitychange', onFirstHidden, { once: true });
    
    // Listen for first input
    ['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(type => {
      addEventListener(type, (event) => {
        const delay = performance.now() - event.timeStamp;
        onFirstInputDelay(delay, event);
      }, { once: true, capture: true });
    });
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logMetrics() {
    const metrics = this.getMetrics();
    console.log('Performance Metrics:', metrics);
    
    // Send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      Object.entries(metrics).forEach(([key, value]) => {
        if (value !== undefined) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: key,
            value: Math.round(value),
            non_interaction: true,
          });
        }
      });
    }

    return metrics;
  }

  public reportToAnalytics(url?: string) {
    const metrics = this.getMetrics();
    const data = {
      url: url || (typeof window !== 'undefined' ? window.location.href : ''),
      metrics,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    };

    // Send to your analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(err => console.warn('Failed to report metrics:', err));
    }
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
}

// Utility function to measure component render time
export function measureComponentPerformance<T extends (...args: any[]) => any>(
  componentName: string,
  fn: T
): T {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    const duration = end - start;

    if (duration > 16) { // Log slow renders (> 16ms)
      console.warn(`Slow render detected in ${componentName}: ${duration.toFixed(2)}ms`);
    }

    return result;
  }) as T;
}

// Hook to measure render performance
export function useRenderPerformance(componentName: string) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const renderStart = performance.now();
    
    requestAnimationFrame(() => {
      const renderEnd = performance.now();
      const duration = renderEnd - renderStart;
      
      if (duration > 16) {
        console.warn(`[${componentName}] Render took ${duration.toFixed(2)}ms`);
      }
    });
  }
}