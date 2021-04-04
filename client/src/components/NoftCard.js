import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, CardColumns, Container } from 'react-bootstrap';
import { GET_SINGLE_CARD } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

export function NoftCard() {
  const { id: noftId } = useParams();
  const { loading, data } = useQuery(GET_SINGLE_CARD, {
    variables: { id: noftId }
  });
  const singleReprint = data?.reprint || {};

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title ><Card.Link href={`/post/${reprint._id}`}>{reprint.title}</Card.Link></Card.Title>
        <Card.Img variant="top" src={reprint.asset} />
        <Card.Text><span role="img" aria-label="like emoji">👍</span>{reprint.likeCount}<span role="img" aria-label="comment emoji" >💬</span>{reprint.commentCount}</Card.Text>
        <Card.Text>NoFT Author: <Card.Link href={`/profile/${reprint.author}`}>{reprint.author}</Card.Link> </Card.Text>
        <Button variant="primary">Download</Button>
      </Card.Body>
    </Card>
  );
};

export default NoftCard;






