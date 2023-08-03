import { useNavigate } from 'react-router-dom';

export const GoBackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      className="btn btn-sm btn-secondary"
      type="button"
      onClick={handleClick}
    >
      Powrót
    </button>
  );
};
