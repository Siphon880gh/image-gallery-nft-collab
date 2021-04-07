import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME, GET_FAVORITES } from '../utils/queries';
import HeartIcon from '../assets/drawnHeartIcon.png';
import CommentIcon from '../assets/drawnCommentIcon.png';
import Auth from '../utils/auth';

const Favorites = props => {

    const { loading, data } = useQuery(GET_ME, GET_FAVORITES);

    const user = data?.me || {};

    // redirect to personal profile page if username is yours
    if (
        Auth.loggedIn()
    )
        if (loading) {
            return <div>Loading...</div>;
        }

    return (
        <Container>
            {console.log(user)}
            {console.log(user.favorites)}


            <h2>
                Viewing Your Favorite Reprints.
        </h2>

            {user.favorites.map((favorites, itrIndex) => {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title ><Card.Link href={`/post/${favorites._id}`}>{favorites.title}</Card.Link></Card.Title>
                            <Card.Img variant="top" src={favorites.asset} />
                            <Card.Text><img src={HeartIcon}
                                width="25"
                                height="25"
                                alt="Noft Custom Icon" />{favorites.likeCount}<img src={CommentIcon}
                                    width="25"
                                    height="25"
                                    alt="Noft Custom Icon" />{favorites.commentCount}</Card.Text>
                            <Card.Text>NoFT Author: <Card.Link href={`/profile/${favorites.author}`}>{favorites.author}</Card.Link> </Card.Text>
                            <Button variant="primary">Download</Button>
                        </Card.Body>
                    </Card>


                );
            })}




        </Container>
    );
};

export default Favorites;






