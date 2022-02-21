import React from 'react';
import Vditor from 'vditor';

const Editor: React.FC<{ value: string }> = ({ value }) => {
  React.useEffect(() => {
    const vd = new Vditor('editor', {
      toolbarConfig: { pin: true },
      counter: { enable: true },
      height: window.innerHeight / 2,
      after: () => {
        vd.setValue(value);
      },
    });
  }, [value]);
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vditor/dist/index.css" />
      <div id="editor" />
    </>
  );
};

export default Editor;
