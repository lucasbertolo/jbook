import './add-cell.css';
import { useActions } from '../hooks/use-actions';
interface AddCellProps {
  nextCellId: string;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();

  return (
    <div>
      <button
        onClick={() => insertCellBefore(nextCellId, 'code')}
        type="button"
      >
        Code
      </button>
      <button
        onClick={() => insertCellBefore(nextCellId, 'text')}
        type="button"
      >
        Text
      </button>
    </div>
  );
};

export default AddCell;
