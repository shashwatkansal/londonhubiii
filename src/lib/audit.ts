// Audit Logging System
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';

export interface AuditLog {
  id?: string;
  timestamp: Date;
  userId: string;
  userEmail: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  result: 'success' | 'failure';
  errorMessage?: string;
}

export interface AuditFilters {
  userId?: string;
  action?: string;
  resource?: string;
  startDate?: Date;
  endDate?: Date;
  result?: 'success' | 'failure';
}

// Common audit actions
export const AUDIT_ACTIONS = {
  // Authentication
  LOGIN: 'auth.login',
  LOGOUT: 'auth.logout',
  PASSWORD_RESET: 'auth.password_reset',
  
  // User Management
  USER_CREATE: 'user.create',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
  USER_ROLE_CHANGE: 'user.role_change',
  
  // Content Management
  CONTENT_CREATE: 'content.create',
  CONTENT_UPDATE: 'content.update',
  CONTENT_DELETE: 'content.delete',
  CONTENT_PUBLISH: 'content.publish',
  CONTENT_UNPUBLISH: 'content.unpublish',
  
  // Settings
  SETTINGS_UPDATE: 'settings.update',
  
  // Data Export
  DATA_EXPORT: 'data.export',
  DATA_IMPORT: 'data.import',
  
  // Access Control
  PERMISSION_DENIED: 'access.permission_denied',
  UNAUTHORIZED_ACCESS: 'access.unauthorized',
} as const;

// Log an audit event
export const logAudit = async (log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<void> => {
  try {
    const auditLog: Omit<AuditLog, 'id'> = {
      ...log,
      timestamp: new Date(),
    };
    
    await addDoc(collection(db, 'audit_logs'), {
      ...auditLog,
      timestamp: Timestamp.fromDate(auditLog.timestamp),
    });
  } catch (error) {
    console.error('Failed to log audit event:', error);
    // Don't throw - we don't want audit logging failures to break the app
  }
};

// Query audit logs
export const queryAuditLogs = async (
  filters: AuditFilters,
  limitCount: number = 100
): Promise<AuditLog[]> => {
  try {
    let q = query(collection(db, 'audit_logs'));
    
    // Apply filters
    if (filters.userId) {
      q = query(q, where('userId', '==', filters.userId));
    }
    if (filters.action) {
      q = query(q, where('action', '==', filters.action));
    }
    if (filters.resource) {
      q = query(q, where('resource', '==', filters.resource));
    }
    if (filters.result) {
      q = query(q, where('result', '==', filters.result));
    }
    if (filters.startDate) {
      q = query(q, where('timestamp', '>=', Timestamp.fromDate(filters.startDate)));
    }
    if (filters.endDate) {
      q = query(q, where('timestamp', '<=', Timestamp.fromDate(filters.endDate)));
    }
    
    // Order by timestamp descending and limit
    q = query(q, orderBy('timestamp', 'desc'), limit(limitCount));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    } as AuditLog));
  } catch (error) {
    console.error('Failed to query audit logs:', error);
    return [];
  }
};

// Helper function to log authentication events
export const logAuthEvent = async (
  action: string,
  userId: string,
  userEmail: string,
  userRole: string,
  result: 'success' | 'failure',
  details?: Record<string, any>
) => {
  await logAudit({
    userId,
    userEmail,
    userRole,
    action,
    resource: 'authentication',
    result,
    details,
  });
};

// Helper function to log content events
export const logContentEvent = async (
  action: string,
  userId: string,
  userEmail: string,
  userRole: string,
  contentId: string,
  contentType: string,
  result: 'success' | 'failure',
  details?: Record<string, any>
) => {
  await logAudit({
    userId,
    userEmail,
    userRole,
    action,
    resource: 'content',
    resourceId: contentId,
    result,
    details: {
      contentType,
      ...details,
    },
  });
};

// Helper function to log user management events
export const logUserEvent = async (
  action: string,
  userId: string,
  userEmail: string,
  userRole: string,
  targetUserId: string,
  result: 'success' | 'failure',
  details?: Record<string, any>
) => {
  await logAudit({
    userId,
    userEmail,
    userRole,
    action,
    resource: 'user',
    resourceId: targetUserId,
    result,
    details,
  });
};

// Get audit summary statistics
export const getAuditStats = async (
  startDate: Date,
  endDate: Date
): Promise<{
  totalEvents: number;
  successRate: number;
  topActions: { action: string; count: number }[];
  topUsers: { userId: string; userEmail: string; count: number }[];
}> => {
  const logs = await queryAuditLogs({ startDate, endDate }, 1000);
  
  const totalEvents = logs.length;
  const successCount = logs.filter(log => log.result === 'success').length;
  const successRate = totalEvents > 0 ? (successCount / totalEvents) * 100 : 0;
  
  // Count actions
  const actionCounts = logs.reduce((acc, log) => {
    acc[log.action] = (acc[log.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topActions = Object.entries(actionCounts)
    .map(([action, count]) => ({ action, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // Count users
  const userCounts = logs.reduce((acc, log) => {
    const key = `${log.userId}|${log.userEmail}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topUsers = Object.entries(userCounts)
    .map(([key, count]) => {
      const [userId, userEmail] = key.split('|');
      return { userId, userEmail, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  return {
    totalEvents,
    successRate,
    topActions,
    topUsers,
  };
};