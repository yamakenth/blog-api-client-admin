import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';
import { Card, Row, Col } from 'react-bootstrap';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1000/blog/articles')
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <div>
      <h4 className='mb-3'>{`Posts (${articles.length})`}</h4>
      <Row>
        {
          articles
            .map((article) => {
              return (
                <Col sm={6} md={4} xl={3} className='mb-3 d-flex align-items-stretch' key={article._id}>
                  <Card>
                    <Card.Body 
                      className={`d-flex flex-column justify-content-between ${(article.published) ? '' : 'unpublish-article'}`}
                    >
                      <div className='mb-3'>
                        <Card.Title>{_.unescape(article.title)}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {_.unescape(article.author.username)}&nbsp;
                          |&nbsp;&nbsp;{moment(article.createdAt).format('MMMM Do YYYY')}
                        </Card.Subtitle>
                        <Card.Text>
                          {_.unescape(article.text).split(' ').slice(0, 20).join(' ') + '...'}
                        </Card.Text>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <Card.Link href={`/articles/${article._id}`}>Edit</Card.Link>
                        <Card.Text>Published: {(article.published) ? 'Yes' : 'No'}</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
        }
      </Row>
    </div>
  );
}

export default ArticleList;