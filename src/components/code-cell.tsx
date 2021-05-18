import { useEffect } from 'react';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';
import './code-cell.css';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { useTypedSelector } from '../hooks/use-typed-selector';
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="wrapper-code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div>loading...</div>
        ) : (
          <Preview code={bundle.code} errorLog={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
