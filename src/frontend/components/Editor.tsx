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
import useAppSnackbar from '../hooks/useAppSnackbar';
import useImgPathInfo from '../hooks/useImgPathInfo';
import { useAppSelector } from '../redux/store';
import createOrUpdate from '../service/createOrUpdate';

const Editor: React.FC<
  | { initialValue?: undefined; path: string; sha?: undefined }
  | { initialValue: string; path: string; sha: string }
> = ({ initialValue, path, sha }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reader = React.useMemo(() => new FileReader(), []);
  const settings = useAppSelector((state) => state.settings.settings);
  const imgPathInfo = useImgPathInfo();
  const [vd, setVd] = React.useState<Vditor>();
  const location = useLocation();
  const navigate = useNavigate();
  const snackbar = useAppSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const viewUrl = location.pathname.replace('/ghEdit/', '/ghView/');
  React.useEffect(() => {
    if (ref.current && !vd) {
      const vditor = new Vditor(ref.current, {
        after: () => {
          setVd(vditor);
          vditor.setValue(initialValue || '');
        },
        cache: { id: 'hspVditor' },
        counter: { enable: true },
        icon: 'material',
        height: isMobile ? window.innerHeight / 2 : undefined,
        typewriterMode: true,
        mode: 'ir',
        cdn: 'https://unpkg.com/vditor',
        hint: { emojiPath: 'https://testingcf.jsdelivr.net/npm/vditor/dist/images/emoji' },
        preview: {
          markdown: { autoSpace: true, fixTermTypo: true, toc: true },
          theme: {
            current: 'light',
            path: 'https://testingcf.jsdelivr.net/npm/vditor/dist/css/content-theme',
          },
        },
        upload: {
          handler: (files) => {
            const file = files[0];
            reader.readAsDataURL(file);
            reader.onload = async () => {
              const resStr = reader.result!.toString();
              const content = resStr.substring(resStr.indexOf(',') + 1);
              const name = `${file.name}-${Date.now()}`;
              const res = await createOrUpdate({
                ...imgPathInfo,
                path: `${imgPathInfo.path}/${name}`,
                message: `➕ Uploaded by Hexo# v${version} at ${new Date().toLocaleString()}`,
                content,
              });
              if (res.status === 201) {
                vditor.insertValue(`![${name}](/api/gh/${res.data.content!.download_url})`);
              }
              console.log(res);
            };
            return null;
          },
          multiple: false,
        },
      });
    }
  }, [initialValue, isMobile, vd, reader, imgPathInfo]);
  return (
    <>
      <link rel="stylesheet" href="https://testingcf.jsdelivr.net/npm/vditor/dist/index.css" />
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
                  owner: settings.owner,
                  repo: settings.repo,
                });
                if (res.status === 200) snackbar.success('修改成功');
                if (res.status === 201) snackbar.success('创建成功');
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
