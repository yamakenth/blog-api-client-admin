import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, ButtonGroup, ToggleButton, Alert } from 'react-bootstrap';
import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';

import CommentDisplay from './CommentDisplay';

function ArticleDisplay(props) {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [createdAt, setCreateAt] = useState(moment(Date.now()).format('YYYY-MM-DD'));
  const [published, setPublished] = useState('-1');
  const [error, setError] = useState('');

  const [authorList, setAuthorList] = useState([]);

  useEffect(() => {
    if (props.actionType === 'edit') {
      axios.get(`http://localhost:1000/blog/articles/${id}`)
        .then((res) => {
          const data = res.data;
  
          setTitle(data.title);
          setText(data.text);
          setAuthor(data.author._id);
          setCreateAt(data.createdAt);
          setPublished((data.published) ? '1' : '-1');
        })
        .catch((err) => {
          console.log(err);
        });  
    }

    axios.get('http://localhost:1000/blog/users', {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then(res => {
        setAuthorList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id, props.actionType]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }

  function handleCreatedAtChange(e) {
    setCreateAt(e.target.value);
  }

  function handlePublishedChange(e) {
    setPublished(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (props.actionType === 'edit') {
      axios.put(
        `http://localhost:1000/blog/articles/${id}`, 
        {
          title: title,
          text: text,
          author: author,
          published: (published === '1') ? 'true' : 'false',
        },
        {
          headers: { Authorization: localStorage.getItem('token') 
        }
      })
        .then(res => {
          console.log(res);
          window.location.href='/';
        })
    } else if (props.actionType === 'create') {
      axios.post(
        'http://localhost:1000/blog/articles', 
        {
          title: title,
          text: text,
          author: author,
          published: (published === '1') ? 'true' : 'false',
        },
        {
          headers: { Authorization: localStorage.getItem('token') 
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.errors) {
            setError(res.data.errors[0]);
          } else {
            window.location.replace('/');
          }
        })
    }
  }

  function handleDelete() {
    axios.delete(`http://localhost:1000/blog/articles/${id}`,
      { headers: { Authorization: localStorage.getItem('token') } }
    )
      .then(res => {
        console.log(res);
        window.location.href='/';
      })
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
    <>
      <Form className='d-flex flex-column' onSubmit={handleSubmit}>
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

        <Form.Group className='mb-3'>
          <Form.Label>Date Written</Form.Label>
          <Form.Control 
            type='date' 
            name='createdAt'
            value={moment(createdAt).format('YYYY-MM-DD')}
            onChange={handleCreatedAtChange}
            readOnly={(props.actionType === 'edit') ? true : false}
           />
        </Form.Group>

        <ButtonGroup className='mb-3 align-self-center'>
          <ToggleButton
            type='radio'
            id='unpublished'
            name='published'
            variant='outline-secondary'
            value='-1'
            checked={published === '-1'}
            onChange={handlePublishedChange}
            >
            Unpublish
          </ToggleButton>
          <ToggleButton
            type='radio'
            id='published'
            name='published'
            variant='outline-success'
            value='1'
            checked={published === '1'}
            onChange={handlePublishedChange}
          >
            Publish
          </ToggleButton>
        </ButtonGroup>

        <ErrorMessage />
        
        <div  className='align-self-end'>
          {props.actionType === 'edit' &&
            <Button variant='danger' type='button' className='me-1' onClick={handleDelete}>
              Delete
            </Button>
          }
          <Button variant='primary' type='submit'>
            {(props.actionType === 'edit') ? 'Save Changes' : 'Add Article'}
          </Button>
        </div>

      </Form>
      
      {props.actionType === 'edit' &&
        <CommentDisplay articleid={id}/>
      }
    </>
  );
}

export default ArticleDisplay;