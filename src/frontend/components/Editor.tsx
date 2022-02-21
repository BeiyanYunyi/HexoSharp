import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import React from 'react';
import Vditor from 'vditor';
import { encode } from 'js-base64';
import createOrUpdate from '../service/createOrUpdate';
import { version } from '../../../package.json';

const Editor: React.FC<
  | { initialValue: undefined; path: string; sha: undefined }
  | { initialValue: string; path: string; sha: string }
> = ({ initialValue, path, sha }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [vd, setVd] = React.useState<Vditor>();
  React.useEffect(() => {
    if (ref.current) {
      const vditor = new Vditor(ref.current, {
        after: () => {
          setVd(vditor);
          if (initialValue) vditor.setValue(initialValue);
        },
        cache: { enable: false },
        icon: 'material',
        height: window.innerHeight / 2,
        typewriterMode: true,
        mode: 'ir',
      });
    }
  }, [initialValue]);
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
                  message: `📝 Uploaded by Hexo# v${version}`,
                  sha,
                });
                console.log(res);
                return null;
              }}
            >
              保存
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};

export default Editor;
