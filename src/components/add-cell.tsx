import './add-cell.css';
import { useActions } from '../hooks/use-actions';
import { FaPlus } from 'react-icons/fa';
interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'force-visibility'}`}>
      <button
        className="button is-rounded is-small is-primary"
        onClick={() => insertCellAfter(previousCellId, 'code')}
        type="button"
      >
        <span className="icon">
          <FaPlus />
        </span>
        <span>Code</span>
      </button>
      <button
        className="button is-rounded is-small is-primary"
        onClick={() => insertCellAfter(previousCellId, 'text')}
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
