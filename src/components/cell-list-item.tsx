import { Cell } from '../state';
import ActionBar from './action-bar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import './cell-list-item.css';
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const child =
    cell.type === 'code' ? (
      <CodeCell cell={cell} />
    ) : (
      <TextEditor cell={cell} />
    );

  return (
    <div className="cell-list-item">
      {child}

      <ActionBar id={cell.id} />
    </div>
  );
};

export default CellListItem;
