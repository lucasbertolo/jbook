import { useEffect, useState } from 'react';
import bundler from '../bundler';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';
import './code-cell.css';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();

  const [code, setCode] = useState('');
  const [errorLog, setErrorLog] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);

      setCode(output.code);
      setErrorLog(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="wrapper-code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        <Preview code={code} errorLog={errorLog} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
