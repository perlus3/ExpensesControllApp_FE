import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../../config/api';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';

export const DeleteAccountBtn = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const handleDeleteClick = async (accountId: string | undefined) => {
    const res = await fetch(`${apiUrl}/accounts/${accountId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userContext?.token}`,
      },
    });
    const data = await res.json();

    if (data.affected) {
      navigate(-1);
    }
  };

  return (
    <button
      className="btn btn-danger"
      type="button"
      onClick={() => handleDeleteClick(id)}
    >
      Usuń konto!
    </button>
  );
};
