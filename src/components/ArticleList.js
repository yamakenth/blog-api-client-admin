import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';
import { Card, Row, Col } from 'react-bootstrap';

// helper method to slice strings
function sliceStr(str, len) {
  const oldWordCnt = str.split(' ').length;
  
  let shortStrArr = str.split(' ').slice(0, len);
  const newWordCnt = shortStrArr.length;

  let slicedStr = shortStrArr.join(' ');
  if (oldWordCnt > newWordCnt) {
    slicedStr += '...';
  }
  
  return slicedStr;
}

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://yamakenth-blog-api-server.herokuapp.com/api/articles')
      .then(res => {
        setArticles(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  
  return (
    <>
      <h4 className='mb-3'>{`Posts (${articles.length})`}</h4>
      <Row>
        {
          articles
            .map((article) => {
              return (
                <Col sm={6} md={4} xl={3} className='mb-3 d-flex align-items-stretch' key={article._id}>
                  <Card className='w-100 article-card'>
                    <Card.Body 
                      className={`d-flex flex-column justify-content-between ${(article.published) ? '' : 'unpublish-article'}`}
                    >
                      <div className='mb-3'>
                        <Card.Title>{sliceStr(_.unescape(article.title), 10)}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {_.unescape(article.author.username)}&nbsp;
                          |&nbsp;&nbsp;{moment(article.createdAt).format('MMMM Do YYYY')}
                        </Card.Subtitle>
                        <Card.Text>
                          {sliceStr(_.unescape(article.text), 20)}
                        </Card.Text>
                      </div>
                      <div className='d-flex justify-content-between'>
                        {localStorage.getItem('username') &&
                          <Card.Link as={Link} to={`/articles/${article._id}/edit`}>Edit</Card.Link>
                        }
                        {!localStorage.getItem('username') &&
                          <Card.Link as={Link} to={`/login`}>Login to edit</Card.Link>
                        }
                        <Card.Text>Published: {(article.published) ? 'Yes' : 'No'}</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
        }
      </Row>
    </>
  );
}

export default ArticleList;