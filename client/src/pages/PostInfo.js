// Create a skeletal structure of what our addPost page will look like
// Set up imports at the top
import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import LikeIcon from '../assets/likeArrowBoxIcon.png';


import Auth from '../utils/auth';
import { GET_SINGLE_CARD } from '../utils/queries';
import { FAVORITE, UNFAVORITE } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';


// Create a const for postForm that'll return JSX
export function PostInfo() {
    let { noftId } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_CARD, {
        variables: { noftId: noftId }
    });
    const [favorite] = useMutation(FAVORITE);
    const singleReprint = data?.reprintById || {};

    if (loading) {
        return <div>Loading...</div>;
    }



    const handleClick = async () => {
        try {
            await favorite({
                variables: { reprintId: noftId }
            });
        } catch (e) {
            console.error(e);
        }
    };


    // Return JSX
    return (
        <div>
            <section>
                <h1>{singleReprint.title}</h1>
            </section>

            <Image src={singleReprint.asset} fluid />

            <Card>
                <Card.Body>{singleReprint.caption}</Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title><Card.Link href={`/profile/${singleReprint.author}`}>{singleReprint.author}</Card.Link></Card.Title>
                    <Card.Title><Card.Link href={`${singleReprint.marketListing}`}>{singleReprint.marketListing}</Card.Link></Card.Title>
                    <Card.Title>{singleReprint.caption}</Card.Title>
                    <Card.Title>{singleReprint.likeCount}</Card.Title>
                    {Auth.loggedIn() && (
                        <button className="favorite-btn" onClick={handleClick}>
                            Favorite
                        </button>
                    )}
                </Card.Body>
            </Card>


            {singleReprint.commentCount > 0 && <CommentList comments={singleReprint.comments} />}

            {Auth.loggedIn() && <CommentForm reprintId={singleReprint._id} />}
        </div>
    );
};

export default PostInfo;