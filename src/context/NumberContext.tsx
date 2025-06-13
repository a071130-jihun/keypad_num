'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface NumberContextType {
  confirmedNumber: string;
  setConfirmedNumber: (value: string) => void;
}

const NumberContext = createContext<NumberContextType | undefined>(undefined);

export function NumberProvider({ children }: { children: ReactNode }) {
  const [confirmedNumber, setConfirmedNumber] = useState('');

  return (
    <NumberContext.Provider value={{ confirmedNumber, setConfirmedNumber }}>
      {children}
    </NumberContext.Provider>
  );
}

export function useNumber() {
  const context = useContext(NumberContext);
  if (!context) {
    throw new Error('useNumber must be used within NumberProvider');
  }
  return context;
}