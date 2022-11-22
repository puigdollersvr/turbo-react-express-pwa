import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';


const LoginForm = ({children}: any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogin();

  const handleLogin = () => {
    login({email, password});
  }

  return (
    <Stack spacing={2} direction="column" justifyContent={"center"} sx={{height:'100%'}}>
      <Card sx={{ minWidth: 275}}>
          <CardContent>
            <Stack spacing={4} direction="column">
              <Typography variant="h2" component="div">
              Login
              </Typography>
              <Stack spacing={2} direction="column" alignItems={"center"} justifyContent={"center"}>
                <TextField
                  required
                  id="filled-required"
                  label="email"
                  variant="standard"
                  onChange={(e) => setEmail(`${e.target.value}`)}
                />
                <TextField
                  required
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  onChange={(e) => setPassword(`${e.target.value}`)}
                />
              </Stack>  
              <Stack spacing={2} direction="row" justifyContent={"center"}>
                <Button variant="contained" onClick={handleLogin}>Login</Button>
                <Button variant="text">Register</Button>
              </Stack>  
            </Stack>
          </CardContent>
        </Card>
    </Stack>
    
  );
}

export default LoginForm;