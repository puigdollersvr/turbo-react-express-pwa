import { Chip, Container } from '@mui/material';
import NavBar from './NavBar';
import { Offline, Online } from 'react-detect-offline';

const Layout = ({children}: any) => {
  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{height: '100vh'}}>
        {children}
      <Online>
        <Chip label="Online" color="success" sx={{'position':'absolute', 'left':50, 'bottom':50}} />
      </Online>
      <Offline>
        <Chip label="Offline" color="error" sx={{'position':'absolute', 'left':50, 'bottom':50}} />
      </Offline>
      </Container>
    </>

  );
}

export default Layout;