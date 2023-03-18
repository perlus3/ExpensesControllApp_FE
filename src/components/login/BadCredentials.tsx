import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const BadCredentials = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(5);

  setInterval(() => {
    setTimer(timer - 1);
  }, 1000);

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
  }, []);
  return (
    <div className="error-message">
      <p>Invalid credentials!</p>
      <p>Powrót do panelu logowania za {timer} sekund</p>
    </div>
  );
};
