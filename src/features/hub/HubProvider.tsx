'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { Hub, HubConfig } from './types';

interface HubContextType {
  hub: Hub;
  setHub: (hub: Hub) => void;
  availableHubs: Hub[];
}

const HubContext = createContext<HubContextType | undefined>(undefined);

interface HubProviderProps {
  children: ReactNode;
  config: HubConfig;
}

export function HubProvider({ children, config }: HubProviderProps) {
  const [currentHub, setCurrentHub] = React.useState<Hub>(config.currentHub);

  const value = {
    hub: currentHub,
    setHub: setCurrentHub,
    availableHubs: config.availableHubs,
  };

  return <HubContext.Provider value={value}>{children}</HubContext.Provider>;
}

export function useHub() {
  const context = useContext(HubContext);
  if (context === undefined) {
    throw new Error('useHub must be used within a HubProvider');
  }
  return context;
} 