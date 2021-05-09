import './add-cell.css';
import { useActions } from '../hooks/use-actions';
import { FaPlus } from 'react-icons/fa';
interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'force-visibility'}`}>
      <button
        className="button is-rounded is-small is-primary"
        onClick={() => insertCellBefore(nextCellId, 'code')}
        type="button"
      >
        <span className="icon">
          <FaPlus />
        </span>
        <span>Code</span>
      </button>
      <button
        className="button is-rounded is-small is-primary"
        onClick={() => insertCellBefore(nextCellId, 'text')}
        type="button"
      >
        <span className="icon">
          <FaPlus />
        </span>
        <span>Text</span>
      </button>
      <div className="divider" />
    </div>
  );
};

export default AddCell;
