import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER, GET_ME, GET_FAVORITES } from '../utils/queries';
import NoftCard from '../components/NoftCard';
import Auth from '../utils/auth';

const Favorites = props => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.author || {};
    const favorited = data?.findFavorites || [];

    // redirect to personal profile page if username is yours
    if (
        Auth.loggedIn() &&
        Auth.getProfile().data.username === userParam
    ) {
        return <Redirect to="/favorites" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    /*    if (!user?.username) {
           return (
               <h4>
                   You need to be logged in to see this. Use the navigation links above to sign up or log in!
               </h4>
           );
       } */

    /* const handleClick = async () => {
        try {
            await addFriend({
                variables: { id: user._id }
            });
        } catch (e) {
            console.error(e);
        }
    }; */

    return (
        <Container>
            {console.log(user)}
            {console.log(favorited)}

            <div >
                <h2>
                    Viewing {userParam ? `${user.username}'s` : 'your'} Favorite Reprints.
        </h2>

            </div>
                );

        </Container>
    );
};

export default Favorites;






