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
    const favorited = data?.findFavorites || [];

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
            {console.log(favorited)}


            <h2>
                Viewing Your Favorite Reprints.
        </h2>

            {favorited.map((userReprint, itrIndex) => {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title ><Card.Link href={`/post/${userReprint._id}`}>{userReprint.title}</Card.Link></Card.Title>
                            <Card.Img variant="top" src={userReprint.asset} />
                            <Card.Text><img src={HeartIcon}
                                width="25"
                                height="25"
                                alt="Noft Custom Icon" />{userReprint.likeCount}<img src={CommentIcon}
                                    width="25"
                                    height="25"
                                    alt="Noft Custom Icon" />{userReprint.commentCount}</Card.Text>
                            <Card.Text>NoFT Author: <Card.Link href={`/profile/${userReprint.author}`}>{userReprint.author}</Card.Link> </Card.Text>
                            <Button variant="primary">Download</Button>
                        </Card.Body>
                    </Card>


                );
            })}




        </Container>
    );
};

export default Favorites;






