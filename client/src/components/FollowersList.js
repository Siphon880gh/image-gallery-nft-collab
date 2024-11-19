import React from 'react';
import { Link } from 'react-router-dom';

const FollowersList = ({ followedCount, username, followed }) => {
    if (!followed || !followed.length) {
        return <p>{username}, go follow some users!</p>;
    }

    return (
        <div>
            <h5>
                {username}'s {followed} {followedCount === 1 ? 'Followed User' : 'Followed Users'}
            </h5>
            {followed.map(followed => (
                <button key={followed._id}>
                    <Link to={`/profile/${followed.username}`}>{followed.username}</Link>
                </button>
            ))}
        </div>
    );
};

export default FollowersList;
