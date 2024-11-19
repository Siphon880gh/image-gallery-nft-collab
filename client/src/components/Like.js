import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { LIKE, UNLIKE } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import LikedIcon from "../assets/heartBoxIcon.png";
import NotLikedIcon from "../assets/heartIconEmpty.png";
import Auth from "../utils/auth";
const Likes = ({singleReprint}) => {

  const [liked, setLiked] = useState(false);
  const [likeNoft] = useMutation(LIKE);
  const [unlikeNoft] = useMutation(UNLIKE);
  let { _id: reprintId } = useParams();

  if (singleReprint.likes.includes(Auth.getProfile().data._id)) {
    setLiked(true);
  }

  return (
    <div>
      {Auth.loggedIn() && (
        <>
          {!liked && (
            <button
              img
              src={NotLikedIcon}
              width="25"
              height="25"
              alt="Noft Not-Liked Icon"
              onClick={() => {
                likeNoft({ reprintId });
                setLiked(true);
              }}
            />
          )}
          {liked && (
            <button
              img
              src={LikedIcon}
              width="25"
              height="25"
              alt="Noft Liked Icon"
              onClick={() => {
                unlikeNoft({ reprintId });
                setLiked(false);
              }}
            />
          )}
        </>
      )}
      {singleReprint.likeCount ? (
        <span>
          <strong>{singleReprint.likeCount}</strong>
          <img
            img
            src={LikedIcon}
            width="25"
            height="25"
            alt="Noft Liked Icon"
          />
        </span>
      ) : (
        <>
          <strong>0 Likes</strong>
        </>
      )}
    </div>
  );
};
export default Likes;
