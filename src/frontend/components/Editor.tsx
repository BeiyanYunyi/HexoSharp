import SaveIcon from '@mui/icons-material/Save';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { encode } from 'js-base64';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { version } from '../../../package.json';
import useImgPathInfo from '../hooks/useImgPathInfo';
import { useAppSelector } from '../redux/store';
import createOrUpdate from '../service/createOrUpdate';
import snackbar from '../utils/Snackbar';

/** 编辑器组件，提供图片上传操作 */
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const viewUrl = location.pathname.replace('/ghEdit/', '/ghView/');
  React.useEffect(() => {
    if (ref.current) {
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
        cdn: 'https://testingcf.jsdelivr.net/npm/vditor',
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
              const name = `${Date.now()}-${file.name}`;
              const res = await createOrUpdate({
                owner: imgPathInfo.owner,
                repo: imgPathInfo.repo,
                path: `${imgPathInfo.path}/${name}`,
                message: `➕ Uploaded by Hexo# v${version} at ${new Date().toLocaleString()}`,
                content,
              });
              if (res.status === 201) {
                vditor.insertValue(
                  `![${name}](${window.location.origin}/api/gh/${res.data.content!.download_url})`,
                );
              }
              console.log(res);
            };
            return null;
          },
          multiple: false,
        },
      });
    }
  }, [initialValue, isMobile, reader, imgPathInfo.owner, imgPathInfo.path, imgPathInfo.repo]);
  return (
    <Card>
      <CardContent sx={{ padding: 0, paddingTop: 1 }}>
        <Stack>
          <Container sx={{ marginBottom: 1 }}>
            <Button>获取当前日期</Button>
          </Container>
          <Typography component="div" ref={ref}>
            编辑器加载中
          </Typography>
        </Stack>
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
  );
};

export default Editor;
