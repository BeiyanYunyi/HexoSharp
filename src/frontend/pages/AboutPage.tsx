import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Link,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import octokit from '../service/octokit';

const Info: FC<{ title: string; value: string }> = ({ title, value }) => (
  <Stack direction="row">
    <Typography gutterBottom sx={{ wordBreak: 'keep-all' }}>
      {title}：
    </Typography>
    {value ? (
      <Typography gutterBottom sx={{ wordBreak: 'keep-all', overflowX: 'auto' }}>
        {value}
      </Typography>
    ) : (
      <Typography sx={{ width: '100%' }}>
        <Skeleton variant="text" />
      </Typography>
    )}
  </Stack>
);

const AboutPage: FC = () => {
  const [latestVersion, setLatestVersion] = useState('');
  useEffect(() => {
    octokit.client.repos
      .listCommits({ owner: 'lixiang810', repo: 'HexoSharp', per_page: 1 })
      .then((res) => {
        setLatestVersion(res.data[0].sha);
      });
  }, []);
  return (
    <Container>
      <Card>
        <CardHeader title="Hexo#" sx={{ textAlign: 'center' }} />
        <CardContent>
          <Stack>
            <Info title="当前版本" value="__COMMIT_ID__" />
            <Info title="最新版本" value={latestVersion} />
            <Info title="作者" value="lixiang810" />
            <Link
              sx={{ width: 'fit-content' }}
              component={RouterLink}
              to="https://github.com/lixiang810/HexoSharp"
            >
              <Typography>GitHub</Typography>
            </Link>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutPage;
