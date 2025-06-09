"use client";
import { useState, useRef } from 'react';
import SiteSettingsSection from "@/app/_components/dashboard/SiteSettingsSection";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialTab?: number;
}

const Tabs = ({ tabs, initialTab = 0 }: TabsProps) => {
  const [selected, setSelected] = useState(initialTab);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % tabs.length;
      setSelected(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + tabs.length) % tabs.length;
      setSelected(prev);
      tabRefs.current[prev]?.focus();
    } else if (e.key === 'Home') {
      setSelected(0);
      tabRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      setSelected(tabs.length - 1);
      tabRefs.current[tabs.length - 1]?.focus();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="Section Tabs" className="flex gap-2 border-b mb-6 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            ref={el => { tabRefs.current[idx] = el; }}
            role="tab"
            aria-selected={selected === idx}
            aria-controls={`tabpanel-${idx}`}
            id={`tab-${idx}`}
            tabIndex={selected === idx ? 0 : -1}
            className={`px-4 py-2 whitespace-nowrap font-semibold border-b-2 transition-colors ${selected === idx ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setSelected(idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`tabpanel-${selected}`}
        role="tabpanel"
        aria-labelledby={`tab-${selected}`}
        className="focus:outline-none"
        tabIndex={0}
      >
        {selected === tabs.length - 1 ? <SiteSettingsSection /> : tabs[selected].content}
      </div>
    </div>
  );
};

export default Tabs; 