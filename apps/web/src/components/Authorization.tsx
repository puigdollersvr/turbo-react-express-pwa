import { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRevalidate } from '../hooks/useRevalidate';
import FullScreenDialog from './FullScreenDialog';
import LoginForm from './LoginForm';

interface IAuthorizationProps {
    children?: ReactNode
}

const Unauthorized = () => {
    const navigate = useNavigate();
    return <>
        <Stack spacing={2} direction="column" justifyContent={"center"}>
            <h1>Unauthorized</h1>
            <p>This is a private area, please:</p>
            <FullScreenDialog buttonLabel='Login'>
                <LoginForm />
            </FullScreenDialog>
        </Stack>  
    </>
}


const Authorization = ({children}:IAuthorizationProps) => {
    const { isValidated } = useRevalidate();
    return <>
        {isValidated ? children : <Unauthorized />}
    </>
}

export default Authorization