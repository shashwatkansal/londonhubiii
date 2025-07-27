import { useEffect, useState, useCallback, useRef } from 'react';
import { db } from '@/lib/firebaseConfig';
import { 
  collection, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit,
  Query,
  DocumentData,
  Unsubscribe,
  QueryConstraint,
  setDoc
} from 'firebase/firestore';

interface RealtimeOptions {
  // Collection to listen to
  collection: string;
  // Document ID for single document listening
  docId?: string;
  // Query constraints
  constraints?: QueryConstraint[];
  // Whether to include metadata changes
  includeMetadataChanges?: boolean;
  // Callback for errors
  onError?: (error: Error) => void;
  // Transform function for data
  transform?: (data: any) => any;
}

interface RealtimeResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

// Hook for listening to a single document
export function useRealtimeDocument<T = DocumentData>(
  collectionName: string,
  documentId: string | null,
  options?: Partial<RealtimeOptions>
): RealtimeResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  const subscribe = useCallback(() => {
    if (!documentId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, collectionName, documentId);
      
      unsubscribeRef.current = onSnapshot(
        docRef,
        { includeMetadataChanges: options?.includeMetadataChanges },
        (snapshot) => {
          if (snapshot.exists()) {
            const rawData = { id: snapshot.id, ...snapshot.data() };
            const transformedData = options?.transform ? options.transform(rawData) : rawData;
            setData(transformedData as T);
          } else {
            setData(null);
          }
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
          options?.onError?.(err);
        }
      );
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      options?.onError?.(err as Error);
    }
  }, [collectionName, documentId, options]);

  useEffect(() => {
    subscribe();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [subscribe]);

  const refresh = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    subscribe();
  }, [subscribe]);

  return { data, loading, error, refresh };
}

// Hook for listening to a collection/query
export function useRealtimeCollection<T = DocumentData>(
  collectionName: string,
  constraints?: QueryConstraint[],
  options?: Partial<RealtimeOptions>
): RealtimeResult<T[]> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  const subscribe = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionName);
      const q = constraints ? query(collectionRef, ...constraints) : collectionRef;
      
      unsubscribeRef.current = onSnapshot(
        q,
        { includeMetadataChanges: options?.includeMetadataChanges },
        (snapshot) => {
          const docs = snapshot.docs.map(doc => {
            const rawData = { id: doc.id, ...doc.data() };
            return options?.transform ? options.transform(rawData) : rawData;
          }) as T[];
          
          setData(docs);
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
          options?.onError?.(err);
        }
      );
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      options?.onError?.(err as Error);
    }
  }, [collectionName, constraints, options]);

  useEffect(() => {
    subscribe();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [subscribe]);

  const refresh = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    subscribe();
  }, [subscribe]);

  return { data, loading, error, refresh };
}

// Hook for listening to aggregate data (counts, sums, etc.)
export function useRealtimeAggregation(
  collectionName: string,
  aggregationType: 'count' | 'sum' | 'average',
  field?: string,
  constraints?: QueryConstraint[]
): RealtimeResult<number> {
  const [data, setData] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  const subscribe = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionName);
      const q = constraints ? query(collectionRef, ...constraints) : collectionRef;
      
      unsubscribeRef.current = onSnapshot(
        q,
        (snapshot) => {
          let result = 0;
          
          switch (aggregationType) {
            case 'count':
              result = snapshot.size;
              break;
            case 'sum':
              if (field) {
                result = snapshot.docs.reduce((sum, doc) => {
                  const value = doc.data()[field];
                  return sum + (typeof value === 'number' ? value : 0);
                }, 0);
              }
              break;
            case 'average':
              if (field && snapshot.size > 0) {
                const sum = snapshot.docs.reduce((total, doc) => {
                  const value = doc.data()[field];
                  return total + (typeof value === 'number' ? value : 0);
                }, 0);
                result = sum / snapshot.size;
              }
              break;
          }
          
          setData(result);
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        }
      );
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [collectionName, aggregationType, field, constraints]);

  useEffect(() => {
    subscribe();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [subscribe]);

  const refresh = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    subscribe();
  }, [subscribe]);

  return { data, loading, error, refresh };
}

// Hook for listening to presence (online users)
export function usePresence(userId: string | null) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const presenceRef = collection(db, 'presence');
    const q = query(presenceRef, where('online', '==', true));
    
    unsubscribeRef.current = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => doc.id);
      setOnlineUsers(users);
      setLoading(false);
    });

    // Set user as online
    const userPresenceRef = doc(db, 'presence', userId);
    const setOnline = async () => {
      await setDoc(userPresenceRef, {
        online: true,
        lastSeen: new Date(),
      });
    };

    const setOffline = async () => {
      await setDoc(userPresenceRef, {
        online: false,
        lastSeen: new Date(),
      });
    };

    setOnline();

    // Handle tab visibility
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setOffline();
      } else {
        setOnline();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', setOffline);

    return () => {
      setOffline();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', setOffline);
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [userId]);

  return { onlineUsers, loading };
}