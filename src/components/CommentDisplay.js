import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Modal, Button } from 'react-bootstrap';
import moment from 'moment';

function ConfirmChangeModal(props) {
  const { articleid } = useParams();

  function handleCommentDelete() {
    axios.delete(`https://yamakenth-blog-api-server.herokuapp.com/api/articles/${articleid}/comments/${props.commentid}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  }
  
  return (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this comment? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => { props.handleClose(); handleCommentDelete(); }}>
            Delete
          </Button>
        </Modal.Footer>     
    </Modal>
  );
}

function CommentDisplay(props) {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState('');

  useEffect(() => {
    axios.get(`https://yamakenth-blog-api-server.herokuapp.com/api/articles/${props.articleid}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.articleid]);

  function handleClose() {
    setShowModal(false);
    setCommentToDelete('');
  }

  function handleShow(idToDelete) {
    setShowModal(true);
    setCommentToDelete(idToDelete);
  }
  
  return (
    <div>
      <h6>Comments ({comments.length})</h6>
      <hr className='mt-1'/>
      {
        comments.map((comment) => {
          return (
            <div key={comment._id}>
              <Card key={comment._id} className='mb-2'>
                <Card.Body  className='py-2'>
                  <div className='d-flex justify-content-between'>
                    <Card.Text className='text-muted mb-1'>
                      {comment.author} | {moment(comment.createdAt).format('MMMM Do YYYY')}
                    </Card.Text>
                    <button 
                      type='button' 
                      className='comment-delete-btn' 
                      onClick={() => handleShow(comment._id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <Card.Text>
                    {comment.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })
      }
      <ConfirmChangeModal 
        show={showModal} 
        handleClose={handleClose} 
        handleShow={handleShow} 
        commentid={commentToDelete}
      />
    </div>
  );
}

export default CommentDisplay;