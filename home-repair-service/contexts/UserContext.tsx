import React, { createContext, useContext, useState } from 'react';

export type UserType = 'customer' | 'worker' | null;

export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  address?: string;
  avatar?: string;
  note?: string;
  specialty?: string;
  rating?: number;
}

interface UserContextType {
  userType: UserType;
  user: UserInfo | null;
  setUserType: (type: UserType) => void;
  setUser: (user: UserInfo | null) => void;
  loadMockUsers: (type: UserType) => Promise<UserInfo[]>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};

// Hàm load mock data từ file json
const loadMockUsers = async (type: UserType): Promise<UserInfo[]> => {
  if (type === 'customer') {
    const data = await import('../mock-data/mockCustomers.json');
    return data.default || data;
  } else if (type === 'worker') {
    const data = await import('../mock-data/mockWorkers.json');
    return data.default || data;
  }
  return [];
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  return (
    <UserContext.Provider value={{ userType, user, setUserType, setUser, loadMockUsers }}>
      {children}
    </UserContext.Provider>
  );
};
