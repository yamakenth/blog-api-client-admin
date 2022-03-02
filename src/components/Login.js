import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      password
    };

    axios.post(`http://localhost:1000/blog/users/login`, user)
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          setError(res.data.message);
        } else {
          localStorage.setItem('token', 'Bearer ' + res.data.token);
          localStorage.setItem('username', res.data.user.username);
          window.location.replace('/');
        }
      });

    setUsername('');
    setPassword('');
  }

  function ErrorMessage() {
    if (error.length > 0) {
      return (
        <Alert variant='danger' className='mt-3'>{error}</Alert>
      );
    }
    return null;
  }

  
  return (
    <Form className='col-sm-4 offset-sm-4 d-flex flex-column' onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='username'>Username:</Form.Label>
        <Form.Control 
          type='text'  
          id='username' 
          name='username'
          required
          value={username}
          onChange={handleUsernameChange}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='password'>Password:</Form.Label>
        <Form.Control 
          type='password'
          id='password'
          name='password'
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <button type='submit' className='btn btn-primary align-self-center'>Submit</button>
      <ErrorMessage />
    </Form>
  );
}

export default Login;