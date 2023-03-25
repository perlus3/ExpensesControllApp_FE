import { useNavigate } from 'react-router-dom';

export const GoBackButton = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <button type="button" onClick={handleClick}>
      Powrót
    </button>
  );
};
