import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import './App.css';
import ArticleDisplay from './components/ArticleDisplay';
import ArticleList from './components/ArticleList';
import ArticleEdit from './components/ArticleEdit';
import Footer from './components/Footer';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container className='main-content px-3 border-start border-end'>
        <Routes>
          <Route path='/' element={<Navigate replace to='/articles' />} />
          <Route path='/articles' element={<ArticleList />} />
          <Route path='/articles/:id' element={<ArticleDisplay />} />
          <Route path='/articles/:id/edit' element={<ArticleEdit />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;