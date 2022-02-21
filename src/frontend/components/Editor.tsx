import SaveIcon from '@mui/icons-material/Save';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  useTheme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { encode } from 'js-base64';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Vditor from 'vditor';
import { version } from '../../../package.json';
import createOrUpdate from '../service/createOrUpdate';

const Editor: React.FC<
  | { initialValue?: undefined; path: string; sha?: undefined }
  | { initialValue: string; path: string; sha: string }
> = ({ initialValue, path, sha }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [vd, setVd] = React.useState<Vditor>();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const viewUrl = location.pathname.replace('/ghEdit/', '/ghView/');
  React.useEffect(() => {
    if (ref.current && !vd) {
      const vditor = new Vditor(ref.current, {
        after: () => {
          setVd(vditor);
          if (initialValue) vditor.setValue(initialValue);
        },
        cache: { enable: false },
        icon: 'material',
        height: isMobile ? window.innerHeight / 2 : undefined,
        typewriterMode: true,
        mode: 'ir',
      });
    }
  }, [initialValue, isMobile, vd]);
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vditor/dist/index.css" />
      <Card>
        <CardContent sx={{ padding: 0, paddingTop: 4 }}>
          <Typography component="div" ref={ref}>
            编辑器加载中
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={async () => {
                if (!vd) return null;
                const res = await createOrUpdate({
                  path,
                  content: encode(vd.getValue()),
                  message: `📝 Uploaded by Hexo# v${version} at ${new Date().toLocaleString()}`,
                  sha,
                });
                console.log(res);
                navigate(viewUrl, { replace: true });
                return null;
              }}
            >
              保存
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                if (sha) {
                  navigate(viewUrl, { replace: true });
                } else {
                  const target = viewUrl.split('/');
                  target.pop();
                  navigate(target.join('/'), { replace: true });
                }
              }}
            >
              返回
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};

export default Editor;
