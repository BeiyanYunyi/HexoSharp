import { Button, Container, TextField } from '@mui/material';
import React from 'react';
import { IFile } from '../types/GetRepoContentData';
import Files from './components/Files';
import ls from './service/ls';

const App = () => {
  const [data, setData] = React.useState<IFile[]>([]);
  const [path, setPath] = React.useState('/');
  const refreshFiles = (targetPath: string) => {
    ls({ owner: 'lixiang810', repo: 'HexoSharp', path: targetPath })
      .then((res) => {
        if (res.data instanceof Array) {
          setData(res.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((e) => console.log(e));
  };
  React.useEffect(() => {
    refreshFiles('/');
  }, []);
  return (
    <Container>
      <TextField
        label="路径"
        value={path}
        onChange={(e) => {
          setPath(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          refreshFiles(path);
        }}
      >
        刷新
      </Button>
      <Files files={data} />
    </Container>
  );
};

export default App;
