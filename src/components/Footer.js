import { Container, Navbar, Nav } from 'react-bootstrap';

import BrandLogo from './BrandLogo';

function Footer() {
  return (
    <footer className='fixed-bottom'>
      <Navbar bg='dark' variant='dark' expand='sm'>
        <Container>
          <Nav>
            <Nav.Link href='https://github.com/yamakenth/blog-api-client-admin' target='_blank'>
              <i className='bi bi-github'>&#9;GitHub</i>
            </Nav.Link>
          </Nav>
          <Navbar.Brand href='/' className='mx-0'><BrandLogo />Blog Admin</Navbar.Brand>
          <Nav>
            <Nav.Link href='https://google.com' target='_blank'>
              <i className='bi bi-person'>&#9;User Page</i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );
}

export default Footer;