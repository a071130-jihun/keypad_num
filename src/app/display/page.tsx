'use client';

import { useState, useEffect } from 'react';

export default function DisplayPage() {
  const [number, setNumber] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    };
    
    checkDarkMode();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    return () => mediaQuery.removeEventListener('change', checkDarkMode);
  }, []);

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const response = await fetch('/api/number');
        const data = await response.json();
        setNumber(data.number);
      } catch (error) {
        console.error('Error fetching number:', error);
      }
    };

    fetchNumber();
    
    // 실시간 업데이트를 위한 폴링 (1초마다)
    const interval = setInterval(fetchNumber, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '48px',
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
    }}>
      {number}
    </div>
  );
}