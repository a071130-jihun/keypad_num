'use client';

import { useState } from 'react';
import { useNumber } from '@/context/NumberContext';

export default function Keypad() {
  const [inputValue, setInputValue] = useState('');
  const { setConfirmedNumber } = useNumber();

  const handleNumberClick = (num: string) => {
    setInputValue(prev => prev + num);
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleBackspace = () => {
    setInputValue(prev => prev.slice(0, -1));
  };

  const handleConfirm = async () => {
    if (inputValue) {
      try {
        const response = await fetch('/api/number', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ number: inputValue }),
        });
        
        if (response.ok) {
          setConfirmedNumber(inputValue);
          alert('숫자가 저장되었습니다!');
        }
      } catch (error) {
        console.error('Error saving number:', error);
      }
    }
  };

  const buttonStyle = {
    width: '80px',
    height: '80px',
    fontSize: '24px',
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  const confirmButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4CAF50',
    color: 'white',
    gridColumn: 'span 3',
    width: 'auto',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <input
        type="text"
        value={inputValue}
        readOnly
        style={{
          fontSize: '32px',
          padding: '10px',
          marginBottom: '20px',
          width: '300px',
          textAlign: 'center',
          border: '2px solid #ccc',
          borderRadius: '8px',
        }}
      />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            style={buttonStyle}
          >
            {num}
          </button>
        ))}
        
        <button onClick={handleClear} style={buttonStyle}>C</button>
        <button onClick={() => handleNumberClick('0')} style={buttonStyle}>0</button>
        <button onClick={handleBackspace} style={buttonStyle}>←</button>
        
        <button onClick={handleConfirm} style={confirmButtonStyle}>
          확인
        </button>
      </div>
    </div>
  );
}