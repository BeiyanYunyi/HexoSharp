import CodeMirror from '@uiw/react-codemirror';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { StreamLanguage } from '@codemirror/language';
import { FC } from 'react';

const YamlEditor: FC = () => {
  const code = `a: bbb`;
  return <CodeMirror value={code} extensions={[StreamLanguage.define(yaml)]} height="50vh" />;
};

export default YamlEditor;
