import { useState, useEffect } from 'react';
import bundler from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import './code-cell.css';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);

      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className="wrapper-code-cell">
        <Resizable direction="horizontal">
          <CodeEditor initialValue="const test = 1;" onChange={setInput} />
        </Resizable>

        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
