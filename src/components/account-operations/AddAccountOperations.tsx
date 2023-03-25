import { useNavigate, useParams } from 'react-router-dom';

export const AddAccountOperations = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const openIncomeForm = () => {
    navigate(`/income-form/${id}`);
  };

  const openExpenseForm = () => {
    navigate(`/expense-form/${id}`);
  };

  return (
    <div className="operation-buttons">
      <button onClick={openIncomeForm}>+</button>

      <button onClick={openExpenseForm}>-</button>
    </div>
  );
};
