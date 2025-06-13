'use client';

import { useState, useEffect } from 'react';

export default function DisplayPage() {
  const [number, setNumber] = useState('');

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

  return <>{number}</>;
}