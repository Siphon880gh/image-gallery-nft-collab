import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER, GET_ME } from '../utils/queries';
import { FOLLOW } from '../utils/mutations';

import LikeIcon from '../assets/likeArrowBoxIcon.png';
import CommentIcon from '../assets/commentIconBox.png';
import Auth from '../utils/auth';

const Profile = props => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.author || {};
    const [follow] = useMutation(FOLLOW);
    // redirect to personal profile page if username is yours
    if (
        Auth.loggedIn() &&
        Auth.getProfile().data.username === userParam
    ) {
        return <Redirect to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }



    const handleClick = async () => {
        try {
            await follow({
                variables: { followedId: user._id }
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container>
            {console.log(userParam)}
            {console.log(user)}
            {console.log(data)}
            <div >
                <h2>
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

            </div>
            <p>Followers: {user.followerCount}</p>
            <p>Followed: {user.followedCount}</p>
            <p>Total Reprints: {user.reprintCount}</p>
            <p>Total Favorite Counts: {user.favoriteCount}</p>

            { Auth.loggedIn() && (
                <button className="follow-btn" onClick={handleClick}>
                    Follow
                </button>
            )}

            <h2>{user.username}'s Reprints:</h2>
            {user.reprints.map((userReprint, itrIndex) => {
                return (
                    <Card key={userReprint._id} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title ><Card.Link href={`/post/${userReprint._id}`}>{userReprint.title}</Card.Link></Card.Title>
                            <Card.Img variant="top" src={userReprint.asset} />
                            <Card.Text><img src={LikeIcon}
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

export default Profile;