import { Stack, Skeleton, Container } from '@mui/material';

/** 页面加载中，需要显示骨架屏 */
const Loading = () => (
  <Container>
    <Stack spacing={1}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" height={118} />
    </Stack>
  </Container>
);

export default Loading;
