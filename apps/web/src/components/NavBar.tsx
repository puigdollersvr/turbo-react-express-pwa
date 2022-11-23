import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar() {

  const { isLoggedIn, logout } = useLogin();
  const [ loginButtonLabel, setLoginButtonLabel ] = useState(isLoggedIn() ? 'Logout' : 'Login')
  const navigate = useNavigate();


  const handleClick = () => {
    if (isLoggedIn()) {
      logout()
      setLoginButtonLabel('Login')
    } 
    else {
        navigate('/login'); 
    }
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom:2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO LIST
          </Typography>
          <Button color="inherit" onClick={handleClick}>{loginButtonLabel}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}