// Role-Based Access Control System

export type Role = 'super_admin' | 'admin' | 'editor' | 'viewer' | 'member';

export interface Permission {
  resource: string;
  actions: string[];
}

export interface RolePermissions {
  role: Role;
  permissions: Permission[];
}

// Define permissions for each role
export const rolePermissions: RolePermissions[] = [
  {
    role: 'super_admin',
    permissions: [
      { resource: '*', actions: ['*'] }, // Full access to everything
    ],
  },
  {
    role: 'admin',
    permissions: [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'content', actions: ['create', 'read', 'update', 'delete', 'publish'] },
      { resource: 'settings', actions: ['read', 'update'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'secrets', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'faqs', actions: ['create', 'read', 'update', 'delete'] },
    ],
  },
  {
    role: 'editor',
    permissions: [
      { resource: 'content', actions: ['create', 'read', 'update'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'faqs', actions: ['create', 'read', 'update'] },
    ],
  },
  {
    role: 'viewer',
    permissions: [
      { resource: 'content', actions: ['read'] },
      { resource: 'analytics', actions: ['read'] },
      { resource: 'faqs', actions: ['read'] },
    ],
  },
  {
    role: 'member',
    permissions: [
      { resource: 'profile', actions: ['read', 'update'] },
      { resource: 'content', actions: ['read'] },
    ],
  },
];

// Check if a role has permission for a specific action on a resource
export const hasPermission = (
  userRole: Role,
  resource: string,
  action: string
): boolean => {
  const roleConfig = rolePermissions.find((rp) => rp.role === userRole);
  if (!roleConfig) return false;

  // Check for wildcard permissions (super admin)
  const hasWildcard = roleConfig.permissions.some(
    (p) => p.resource === '*' && p.actions.includes('*')
  );
  if (hasWildcard) return true;

  // Check specific permissions
  return roleConfig.permissions.some(
    (p) =>
      (p.resource === resource || p.resource === '*') &&
      (p.actions.includes(action) || p.actions.includes('*'))
  );
};

// Get all permissions for a role
export const getRolePermissions = (role: Role): Permission[] => {
  const roleConfig = rolePermissions.find((rp) => rp.role === role);
  return roleConfig?.permissions || [];
};

// Check if a role can access a resource
export const canAccessResource = (userRole: Role, resource: string): boolean => {
  const roleConfig = rolePermissions.find((rp) => rp.role === userRole);
  if (!roleConfig) return false;

  return roleConfig.permissions.some(
    (p) => p.resource === resource || p.resource === '*'
  );
};

// Get accessible resources for a role
export const getAccessibleResources = (role: Role): string[] => {
  const roleConfig = rolePermissions.find((rp) => rp.role === role);
  if (!roleConfig) return [];

  if (roleConfig.permissions.some((p) => p.resource === '*')) {
    // Return all possible resources if has wildcard access
    return ['users', 'content', 'settings', 'analytics', 'secrets', 'faqs', 'profile'];
  }

  return Array.from(new Set(roleConfig.permissions.map((p) => p.resource)));
};

// Role hierarchy - higher roles inherit permissions from lower roles
export const roleHierarchy: Record<Role, number> = {
  super_admin: 5,
  admin: 4,
  editor: 3,
  viewer: 2,
  member: 1,
};

// Check if roleA is higher than roleB in hierarchy
export const isHigherRole = (roleA: Role, roleB: Role): boolean => {
  return roleHierarchy[roleA] > roleHierarchy[roleB];
};

// Get the highest role from a list of roles
export const getHighestRole = (roles: Role[]): Role => {
  return roles.reduce((highest, current) =>
    roleHierarchy[current] > roleHierarchy[highest] ? current : highest
  );
};