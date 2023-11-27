import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { Outlet, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { LogoutAction, getUserRequest, isSigned } from '../API/LoginRequests';
import { enqueueSnackbar } from 'notistack';

const sections = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/About' },
  { title: 'History', url: '/History' },
  { title: 'Albums', url: '/Albums' },
];

export default function Header() {
  const navigator = useNavigate()
  const location = useLocation();
  const [username, setUsername] = React.useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (!isSigned()) return;
    getUserRequest().then(function (response) {
      if (response.status === 401) {
        setUsername('')
        return;
      }
      if (response.status >= 400 && response.status < 600) {
        enqueueSnackbar("Sorry, internal error occured", {
          variant: 'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
        });
        setUsername('')
        return;
      }
      setUsername(response.data.username!);
    })
  }, [])
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        {sections.map((section) => (
          <Link
            component={RouterLink}
            to={section.url}
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            sx={{ p: 1, flexShrink: 0, textDecoration: 'none' }}
          >
            {section.title}
          </Link>
        ))}
        {isSigned() ?
          <Link variant="subtitle1" align="center" color="text.primary" component="span" onClick={handleClick} sx={{ ml: 'auto', textDecoration: 'none', ":hover": { cursor: 'pointer' } }}>
            {username}
          </Link>
          :
          <Button variant="outlined" size="small" sx={{ ml: 'auto' }} onClick={() => navigator("/Sign-in")}>
            Sign up
          </Button>}
        <Menu
          disableAutoFocusItem
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => { LogoutAction(); navigator(location); handleClose(); }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
      <Outlet></Outlet>
    </React.Fragment>
  );
}