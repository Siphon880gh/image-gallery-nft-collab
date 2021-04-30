import React from 'react';
import { CardColumns, Container } from 'react-bootstrap';
import { GET_STREAM } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import LikeIcon from '../assets/likeArrowBoxIcon.png';
import CommentIcon from '../assets/drawnCommentIcon.png';

export function Home() {
  const { loading, data } = useQuery(GET_STREAM);
  const streamnofts = data?.stream || [];

  return (<React.Fragment>
    {loading ? (
      <div>Loading... If on free server Heroku, this may take a while if the page hasn't been loaded in a while. Thank you.</div>
      // TODO: We can add a spinner here
    ) : (
      <Container>
        <h2>
          {streamnofts.length
            ? ``
            : 'No trending NoFTs found. Is this a fresh install? Try seeding the database.'}
        </h2>
        <CardColumns>
          {streamnofts.map((reprint, itrIndex) => {
            return (
              <Card key={reprint._id}>
                <Card.Body>
                  <Card.Title ><Card.Link href={`/post/${reprint._id}`}>{reprint.title}</Card.Link></Card.Title>
                  <Card.Img variant="top" src={reprint.asset} />
                  <Card.Text><img src={LikeIcon}
                    width="25"
                    height="25"
                    alt="Noft Custom Icon" />{reprint.likeCount}<img src={CommentIcon}
                      width="25"
                      height="25"
                      alt="Noft Custom Icon" />{reprint.commentCount}</Card.Text>
                  <Card.Text>NoFT Author: <Card.Link href={`/profile/${reprint.author}`}>{reprint.author}</Card.Link> </Card.Text>
                  <Button variant="primary" >Download</Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    )
    }
  </React.Fragment>);
};

export default Home;
