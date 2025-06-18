'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DisplayPage() {
  const params = useParams();
  const pageId = params.id as string;
  const [displayNumber, setDisplayNumber] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const response = await fetch(`/api/pages/${pageId}`);
        if (response.ok) {
          const data = await response.json();
          setDisplayNumber(data.number || '');
        }
      } catch (error) {
        console.error('Error fetching number:', error);
      } finally {
        setLoading(false);
      }
    };

    // 초기 로드
    fetchNumber();

    // 1초마다 폴링하여 실시간 업데이트
    const interval = setInterval(fetchNumber, 1000);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval);
  }, [pageId]);

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f0f0f0'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Display for Page {pageId}</h1>
      <div style={{
        fontSize: '5rem',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minWidth: '300px',
        textAlign: 'center',
        color: '#333'
      }}>
        {loading ? 'Loading...' : (displayNumber || 'No input yet')}
      </div>
    </main>
  );
}