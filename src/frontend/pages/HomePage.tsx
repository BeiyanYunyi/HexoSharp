import FolderIcon from '@mui/icons-material/Folder';
import GitHubIcon from '@mui/icons-material/GitHub';
import ImageIcon from '@mui/icons-material/Image';
import {
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  Container,
  Grid,
  useTheme,
  Link,
  colors,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppGridItem from '../components/AppGridItem';

/** 对每个首页元素进行抽象 */
const ListItem: React.FC<{
  iconBgColor?: string;
  title: string;
  icon: React.ReactElement;
  to?: string;
  href?: string;
}> = ({ iconBgColor, title, icon, to, href }) => (
  <AppGridItem>
    <Card>
      {href ? (
        <Link href={href} rel="noreferrer">
          <CardActionArea>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: iconBgColor }}>{icon}</Avatar>}
              title={title}
            />
          </CardActionArea>
        </Link>
      ) : (
        <Link component={RouterLink} to={to || ''}>
          <CardActionArea>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: iconBgColor }}>{icon}</Avatar>}
              title={title}
            />
          </CardActionArea>
        </Link>
      )}
    </Card>
  </AppGridItem>
);

/** 首页 */
const HomePage: React.FC = () => {
  const theme = useTheme();
  return (
    <Container sx={{ alignItems: 'center' }}>
      <Grid container justifyContent="center" spacing={1}>
        <ListItem
          iconBgColor={theme.palette.primary.main}
          title="浏览图片"
          icon={<ImageIcon />}
          to="/imgList"
        />
        <ListItem
          iconBgColor={theme.palette.primary.main}
          title="浏览 repo 文件"
          icon={<FolderIcon />}
          to="/ghView"
        />
        <ListItem
          iconBgColor={colors.green[700]}
          title="设置"
          icon={<SettingsIcon />}
          to="/settings"
        />
        <ListItem
          iconBgColor="#333"
          title="来 GitHub Star 我"
          icon={<GitHubIcon />}
          href="https://github.com/lixiang810/HexoSharp"
        />
      </Grid>
    </Container>
  );
};

export default HomePage;
