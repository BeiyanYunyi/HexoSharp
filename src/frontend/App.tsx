import { Container, Typography } from '@mui/material';
import React from 'react';
import octokit from './service/octokit';

const App = () => {
  const [data, setData] = React.useState<string>('');
  React.useEffect(() => {
    octokit.repos
      .get({ owner: 'lixiang810', repo: 'HexoSharp' })
      .then((res) => {
        setData(JSON.stringify(res.data, null, 2));
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Container>
      <Typography sx={{ whiteSpace: 'pre', fontFamily: '"Fira Code", "Microsoft YaHei"' }}>
        {data}
      </Typography>
    </Container>
  );
};

export default App;
