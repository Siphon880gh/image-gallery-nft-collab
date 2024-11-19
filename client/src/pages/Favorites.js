import React from 'react';
import { Container } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import PostCard from "../components/PostCard";
import LoadingSpindle from "../assets/spinner-1.3s-200px.png";

const Favorites = () => {

    const { loading, data } = useQuery(GET_ME);

    const user = data?.me || {};

    // redirect to personal profile page if username is yours
    if (
        Auth.loggedIn()
    )
        if (loading) {
            return <div><img src={LoadingSpindle}></img></div>;
        }

    return (
        <Container>
            <h2>
                Viewing Your Favorite Reprints
        </h2>
            {user.favorites.map((favorite, itrIndex) => {
                return (
                    <PostCard key={favorite._id} postcard={favorite}/>
                );
            })}




        </Container>
    );
};

export default Favorites;






