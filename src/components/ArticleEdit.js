import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';

import CommentDisplay from './CommentDisplay';

function ArticleDisplay() {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [createdAt, setCreateAt] = useState('');
  const [published, setPublished] = useState(false);

  const [authorList, setAuthorList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:1000/blog/articles/${id}`)
      .then((res) => {
        const data = res.data;
        
        setTitle(data.title);
        setText(data.text);
        setAuthor(data.author._id);
        setCreateAt(data.createdAt);
        setPublished(data.published);
      })
      .catch((err) => {
        console.log(err);
      });  

    axios.get('http://localhost:1000/blog/users', {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then(res => {
        setAuthorList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }, [id]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Form className='d-flex flex-column'>
        <Form.Group className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type='text' 
            name='title'
            value={_.unescape(title)}
            onChange={handleTitleChange}
           />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Text</Form.Label>
          <Form.Control 
            as='textarea' 
            name='text'
            rows='10'
            value={_.unescape(text)}
            onChange={handleTextChange}
           />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Author</Form.Label>
          <Form.Select onChange={handleAuthorChange} value={author}>
            {
              authorList.map(author => {
                return (
                  <option key={author._id} value={author._id}>{_.unescape(author.username)}</option>
                );
              })
            }
          </Form.Select>
        </Form.Group>

      <div>
        <p>{moment(createdAt).format('MMMM Do YYYY')}</p>
        <p>{String(published)}</p>
      </div>

        <Button variant='primary' type='submit' className='align-self-end' onSubmit={handleSubmit}>
          Save Changes
        </Button>
      </Form>

      <CommentDisplay articleid={id}/>
    </>
  );
}

export default ArticleDisplay;