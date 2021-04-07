import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { LIKE, UNLIKE } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import LikedIcon from "../assets/heartBoxIcon.png";
import NotLikedIcon from "../assets/heartIconEmpty.png";
import Auth from "../utils/auth";

const Likes = function({singleReprint, otherAuth}) {
  const likedByIds = singleReprint.likes.map(likeObject=>likeObject._id);
  const myId = Auth.getProfile().data._id;
  const isLikedByMe = likedByIds.includes(myId);

  const [liked, setLiked] = useState(isLikedByMe);
  const [likeNoft] = useMutation(LIKE);
  const [unlikeNoft] = useMutation(UNLIKE);
  let { noftId: reprintId } = useParams();

  // Debug
  console.log({reprintId})
  console.log({isLikedByMe});

  const NotLikedIconJSX = ()=> {
    return (<button
            src={NotLikedIcon}
            width="25"
            height="25"
            alt="Noft Not-Liked Icon"
            onClick={() => {
              try {
                unlikeNoft({ 
                  variables: {
                    reprintId 
                }
              })
              } catch(e) {
                console.error(e);
              }

              setLiked(false);
            }}
          >Unlike</button>
   );
  }
  
  const LikedIconJSX = ()=> {
    return (<button
          src={LikedIcon}
          width="25"
          height="25"
          alt="Noft Liked Icon"
          onClick={() => {
              try {
                likeNoft({ 
                  variables: {
                    reprintId 
                  }
                  });
              } catch(e) {
                console.error(e);
              }
                
            setLiked(true);
          }}
        >Like</button>
    );
  }

  return (
      <>
        {
          liked?<NotLikedIconJSX/>:<LikedIconJSX/>
        }

      {Boolean(singleReprint.likeCount.length) ? (
        <span>
          <strong>{singleReprint.likeCount}</strong>
          <img
            img
            src={LikedIcon}
            width="25"
            height="25"
            alt="Noft Count"
          />
        </span>
      ) : (
        <>
          <strong>0 Likes</strong>
        </>
      )}
      </>
  );
};
export default Likes;
