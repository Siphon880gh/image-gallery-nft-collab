import React, { useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { GET_LIKES } from '../utils/queries';
import { LIKE, UNLIKE } from '../utils/mutations';
import { useQuery, useMutation } from "@apollo/react-hooks";
import LikedIcon from '../assets/likeArrowBoxIcon.png';
import NotLikedIcon from '../assets/likeOrangeArrowBoxIcon.png';
import Auth from '../utils/auth';

const Likes = (props) => {

    // stores if the currently logged in user has liked the post
    const [liked, setLiked] = useState(false);
    // stores the number of likes
    const [countLikes, setCountLikes] = useState(-1);

    // will store value of userId for the lifetime of component
    const userId = useRef(null);

    let { _id: reprintId } = useParams();


    // like post mutation
    const [likeNoft] = useMutation(LIKE, {
        variables: { _id: reprintId, userId: userId.current },
        refetchQueries: [
            {
                query: GET_LIKES,
                variables: { _id: reprintId, userId: userId.current }
            }
        ]
    });

    // delete post mutation
    const [unlikeNoft] = useMutation(UNLIKE, {
        variables: { _id: reprintId, userId: userId.current },
        refetchQueries: [
            {
                query: GET_LIKES,
                variables: { _id: reprintId, userId: userId.current }
            }
        ]
    });

    // fetch number of likes 
    const { loading, error, data } = useQuery(GET_LIKES, {
        variables: { _id: reprintId }
    });


    const singleReprint = data?.reprint || {};


    // if above useQuery data is not loaded
    if (loading) return "Loading...";
    // if data fetch failed
    if (error) return `Error! ${error.message}`;

    // countLikes is used to ensure that it should only run for the first time
    if (countLikes === -1) {
        // if the user has already liked the post, we know that data has loaded now so we can reference 
        if (singleReprint.likeCount.length > 0) {
            setLiked(true);
        }

        // store value of number of likes in state, we are putting check conditions to prevent infinite loops
        setCountLikes(singleReprint.likeCount);
    }

    return (

        <div className="post-like-container">
            {Auth.loggedIn() && (
                <>
                    {!liked && (
                        <button
                            img src={LikedIcon}
                            width="25"
                            height="25"
                            alt="Noft Not-Liked Icon"

                            onClick={() => {
                                likeNoft();
                                setLiked(true);
                                setCountLikes(countLikes + 1);
                            }}
                        />
                    )}
                    {liked && (
                        <button
                            img src={NotLikedIcon}
                            width="25"
                            height="25"
                            alt="Noft Liked Icon"
                            onClick={() => {
                                unlikeNoft();
                                setLiked(false);
                                setCountLikes(countLikes - 1);
                            }}
                        />
                    )}
                </>
            )}
            {countLikes ? <span><strong>{singleReprint.countLikes}</strong><img img src={LikedIcon}
                width="25"
                height="25"
                alt="Noft Liked Icon" /></span> : null}
        </div>
    );
}

export default Likes;