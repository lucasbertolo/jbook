import { useActions } from '../hooks/use-actions';
import { FaArrowCircleDown, FaArrowCircleUp, FaTrash } from 'react-icons/fa';
import './action-bar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <div className="is-primary button is-small">
        <FaArrowCircleUp
          onClick={() => moveCell(id, 'up')}
          style={{ zIndex: 1 }}
        />
      </div>

      <div className="is-primary button is-small">
        <FaArrowCircleDown
          onClick={() => moveCell(id, 'down')}
          style={{ zIndex: 1 }}
        />
      </div>
      <div className="is-primary button is-small">
        <FaTrash
          onClick={() => deleteCell(id)}
          style={{ zIndex: 1 }}
        />
      </div>
    </div>
  );
};

export default ActionBar;
