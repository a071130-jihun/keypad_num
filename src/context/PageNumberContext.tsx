'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageNumberContextType {
  pageNumbers: Record<string, string>;
  setPageNumber: (pageId: string, number: string) => void;
  getPageNumber: (pageId: string) => string | undefined;
}

const PageNumberContext = createContext<PageNumberContextType | undefined>(undefined);

export const PageNumberProvider = ({ children }: { children: ReactNode }) => {
  const [pageNumbers, setPageNumbers] = useState<Record<string, string>>({});

  const setPageNumber = (pageId: string, number: string) => {
    setPageNumbers(prev => ({
      ...prev,
      [pageId]: number
    }));
  };

  const getPageNumber = (pageId: string) => {
    return pageNumbers[pageId];
  };

  return (
    <PageNumberContext.Provider value={{ pageNumbers, setPageNumber, getPageNumber }}>
      {children}
    </PageNumberContext.Provider>
  );
};

export const usePageNumber = () => {
  const context = useContext(PageNumberContext);
  if (!context) {
    throw new Error('usePageNumber must be used within a PageNumberProvider');
  }
  return context;
};