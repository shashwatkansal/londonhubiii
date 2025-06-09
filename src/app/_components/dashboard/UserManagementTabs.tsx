"use client";
import { useEffect, useState } from 'react';
import { directoryHelpers, User, Role } from '@/app/database/models';
import Tabs from './Tabs';
import UserManagementSection from './UserManagementSection';
import TableSkeleton from './TableSkeleton';

const UserManagementTabs = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const allUsers = await directoryHelpers.getAll();
        setUsers(allUsers);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <TableSkeleton />;

  const allUsers = users;
  const activeUsers = users.filter(u => u.externalViewEnabled);
  const curators = users.filter(u => u.role === Role.Curator);

  return (
    <Tabs
      tabs={[
        {
          label: 'All Users',
          content: <UserManagementSection initialUsers={allUsers} />,
        },
        {
          label: 'Active Users',
          content: <UserManagementSection initialUsers={activeUsers} />,
        },
        {
          label: 'Curators',
          content: <UserManagementSection initialUsers={curators} />,
        },
      ]}
    />
  );
};

export default UserManagementTabs; 