import { useState } from 'react';
import bundler from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundler(input);

    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue="const test = 1;" onChange={setInput} />
        </Resizable>

        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}

        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
