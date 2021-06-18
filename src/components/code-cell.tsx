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
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;

    const orderedCells = order.map((id) => data[id]);

    const cumulative = [
      `
        import _React from 'react';

        const print = async value => {
          const root = document.querySelector('#root');

          if(value?.$$typeof && value?.props){
            let _ReactDOM = await import('react-dom');          

            _ReactDOM.render(value, root);

            return;
          }

          if(typeof value === 'object'){
            root.innerHTML = JSON.stringify(value);

            return;
          }

          root.innerHTML = value;
        };
      `,
    ];

    for (let orderCell of orderedCells) {
      if (orderCell.type === 'code') {
        cumulative.push(orderCell.content);
      }

      if (orderCell.id === cell.id) break;
    }

    return cumulative;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join('\n'), cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="wrapper-code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-container">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} errorLog={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
