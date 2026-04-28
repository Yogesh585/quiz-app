import React, { useEffect } from 'react';
import { Text } from 'react-native';

export default function Timer({ timeLeft, setTimeLeft }) {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Text style={{ fontSize: 14, color: 'green' }}>Time</Text>
      <Text style={{ fontSize: 18 }}>
        {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, '0')}
      </Text>
    </>
  );
}