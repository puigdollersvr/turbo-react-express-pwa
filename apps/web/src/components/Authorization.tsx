import { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

interface IAuthorizationProps {
    children?: ReactNode
}

const Unauthorized = () => {
    const navigate = useNavigate();
    return <>
        <Stack spacing={2} direction="column" justifyContent={"center"}>
            <h1>Unauthorized</h1>
            <p>This is a private area, please:</p>
            <Button variant="outlined" onClick={ () => navigate('/login') }>Login</Button>
        </Stack>  
    </>
}


const Authorization = ({children}:IAuthorizationProps) => {
    const { isLoggedIn } = useLogin();
    return <>
        {isLoggedIn() ? children : <Unauthorized />}
    </>
}

export default Authorization