import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../../contexts';


interface  IAppSidenavProps {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({  path: resolvedPath.pathname, end: false});

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton onClick={handleClick} selected={!!match}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};


export const AppSidenav: React.FC<IAppSidenavProps> = ({ children }) => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { drawerOptions, isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme, themeName } = useAppThemeContext();

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={ smDown ? 'temporary' : 'permanent'} >
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar sx={{ width: theme.spacing(12), height: theme.spacing(12) }}>W</Avatar>
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemLink 
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List> 
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>{themeName === 'dark' ? 'light_mode' : 'dark_mode'}</Icon>
                </ListItemIcon>
                <ListItemText primary={themeName === 'dark' ? 'Modo claro' : 'Modo escuro'} />
              </ListItemButton>
            </List>
          </Box>
          
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        { children }
      </Box>
    </>
  );

};