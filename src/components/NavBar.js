import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

import BrandLogo from './BrandLogo';

function UserAuth() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  function handleClick() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername('');

    navigate('/');
  }
  
  if (username.length > 0) {
    return (
      <Nav>
        <Navbar.Text className='me-3'>
          Welcome <span className='nav-username'>{username}</span>
        </Navbar.Text>
        <Nav.Link as={Link} to='/articles/create'><i className='bi bi-file-earmark-plus'>&#9;Create Article</i></Nav.Link>
        <button className='logout-button' onClick={handleClick}>
          <i className='bi bi-box-arrow-right'>&#9;Logout</i>
        </button>
      </Nav>
    );
  } else {
    return (
      <Nav>
        <Nav.Link as={Link} to='/signup'><i className='bi bi-person-plus'>&#9;Signup</i></Nav.Link>
        <Nav.Link as={Link} to='/login'><i className='bi bi-box-arrow-in-right'>&#9;Login</i></Nav.Link>
      </Nav>
    );
  }
}

function NavBar() {  
  return (
    <header className='fixed-top'>
      <Navbar bg='dark' variant='dark' expand='sm'>
        <Container>
          <Navbar.Brand as={Link} to='/'><BrandLogo />Blog Admin</Navbar.Brand>
          <UserAuth />
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;