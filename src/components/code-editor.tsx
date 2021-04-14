import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import './code-editor.css';
import './syntax.css';

// TODO - CHECK NEW VERSIONS FOR THESE PACKAGES
import Highlighter from 'monaco-jsx-highlighter';
import codeShift from 'jscodeshift';

const options: editor.IEditorConstructionOptions = {
  wordWrap: 'on',
  autoIndent: 'full',
  minimap: { enabled: false },
  showUnused: false,
  folding: false,
  lineNumbersMinChars: 3,
  fontSize: 20,
  scrollBeyondLastLine: false,
  automaticLayout: true,
};

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 4 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );

    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    if (!editorRef.current) return;

    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        type="button"
        onClick={onFormatClick}
        className="button button-format is-primary is-small"
      >
        Format
      </button>

      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="500px"
        language="javascript"
        theme="dark"
        options={options}
      />
    </div>
  );
};

export default CodeEditor;
