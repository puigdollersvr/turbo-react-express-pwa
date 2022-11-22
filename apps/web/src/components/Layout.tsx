import { Container } from '@mui/material';
import NavBar from './NavBar';

const Layout = ({children}: any) => {
  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{height: '100vh'}}>
        {children}
      </Container>
    </>

  );
}

export default Layout;