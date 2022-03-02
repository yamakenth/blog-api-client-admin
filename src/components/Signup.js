import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      password,
      'password-confirm': passwordConfirm
    };

    axios.post(`http://localhost:1000/blog/users/signup`, user)
      .then((res) => {
        if (res.data.errors) {
          setError(res.data.errors[0]);
        } else {
          window.location.replace('/');
        }
      });

    setUsername('');
    setPassword('');
    setPasswordConfirm('');
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
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='password-confirm'>Password Confirmation:</Form.Label>
        <Form.Control 
          type='password'
          id='password-confirm'
          name='password-confirm'
          required
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
      </Form.Group>
      <button type='submit' className='btn btn-primary align-self-center'>Signup</button>
      <ErrorMessage />
    </Form>
  );
}

export default Signup;