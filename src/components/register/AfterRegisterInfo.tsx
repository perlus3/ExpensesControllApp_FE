import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const AfterRegisterInfo = () => {
  const [timer, setTimer] = useState<number>(5);
  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/');
  }, 5000);
  setInterval(() => {
    setTimer(timer - 1);
  }, 1000);
  return (
    <div className="container">
      <p className="text-center fs-1 text">
        Zarejestrowano użytkownika poprawnie, na podany adres email został
        wysłany link aktywujący konto, potwierdz go aby sie zalogować. Powrót do
        strony logowania za {timer} sekund.
      </p>
    </div>
  );
};
