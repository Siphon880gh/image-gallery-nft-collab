import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { LIKE, UNLIKE } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import LikedIcon from "../assets/likeThumbsOrange.png";
import NotLikedIcon from "../assets/likeThumbsNone.png";
import Auth from "../utils/auth";
import "./Like.css";

const Likes = function ({ singleReprint, otherAuth }) {

  // Prepare like button if logged
  const likedByIds = singleReprint.likes.map(likeObject => likeObject._id);
  const profile = Auth.getProfile();
  const myId = profile ? profile.data._id : null;
  const isLikedByMe = myId ? likedByIds.includes(myId) : null;

  const [liked, setLiked] = useState(isLikedByMe);
  const [likeCount, setLikeCount] = useState(singleReprint.likeCount)
  const [likeNoft] = useMutation(LIKE);
  const [unlikeNoft] = useMutation(UNLIKE);
  let { noftId: reprintId } = useParams();

  // Debug
  // console.log({reprintId})
  // console.log({isLikedByMe, info: "Would be null if not logged in"});

  function toggleLikeIncrement(diff) {
    setLikeCount(likeCount + diff);
  }

  const NotLikedIconJSX = () => {

    if (Auth.loggedIn())
      return (<img
        src={NotLikedIcon}
        width="70"
        height="34"
        alt="Noft Not-Liked Icon"
        onClick={() => {
          try {
            unlikeNoft({
              variables: {
                reprintId
              }
            })
          } catch (e) {
            console.error(e);
          }

          setLiked(false);
          toggleLikeIncrement(-1);
        }}
      ></img>
      )
    else
      return (<></>);
  }

  const LikedIconJSX = () => {
    if (Auth.loggedIn())
      return (<img
        src={LikedIcon}
        width="70"
        height="34"
        alt="Noft Liked Icon"
        onClick={() => {
          try {
            likeNoft({
              variables: {
                reprintId
              }
            });
          } catch (e) {
            console.error(e);
          }

          setLiked(true);
          toggleLikeIncrement(1);
        }}
      ></img>
      )
    else
      return (<></>);
  }

  return (
    <>
      {liked ? <NotLikedIconJSX /> : <LikedIconJSX />} <span class="like-count">{likeCount}</span>
    </>
  );
};
export default Likes;
