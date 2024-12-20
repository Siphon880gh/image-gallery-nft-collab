import React from 'react';
import {Card, Button} from 'react-bootstrap';
import LikeIcon from '../assets/likeArrowBoxIcon.png';
import CommentIcon from '../assets/drawnCommentIcon.png';
import "./PostCard.css";

export default function PostCard({postcard}) {
    async function openBloblUrl(e) {
  
      let assetUrl = e.target.getAttribute("data-asset-url");
      let downloadFilename = e.target.getAttribute("data-asset-filename");
  
      async function innerClosure() {
        let response = await fetch(assetUrl);
        let blob = await response.blob(); // download as Blob object
        let blobUrl = await window.URL.createObjectURL(blob);
        return blobUrl;
      }
  
      let blobUrl = await innerClosure();
  
      var forcer = document.querySelector("#force-download");
      forcer.innerHTML = "";
      var a = document.createElement("a");
      a.href = blobUrl;
      a.setAttribute("download", downloadFilename);
      forcer.appendChild(a);
      a.click();
  
      return blobUrl;
  
    } // openBloblUrl
  
    function trimFilename(url) {
      let dropRight = url.indexOf("?alt");
      url = url.substr(0, dropRight);
      let dropLeft = url.indexOf("/o/") + 3;
      url = url.substr(dropLeft);
      return url;
    }

    return (
        <Card className="postcard">
            <Card.Body>
            
            <div className="post-header"><Card.Title className="title">
                <Card.Link href={`/app/image-gallery-nft-collab/post/${postcard._id}`}>{postcard.title}</Card.Link></Card.Title>
                <Card.Subtitle>NoFT Author: <Card.Link href={`/app/image-gallery-nft-collab/profile/${postcard.author}`}>{postcard.author}</Card.Link> </Card.Subtitle>
            </div>
            

            <Card.Img variant="top" src={postcard.asset} />
            <Card.Text>
                <span className="likeUI">
                    <img src={LikeIcon}
                        width="25"
                        height="25"
                        alt="Noft Custom Icon"/>
                    <span className="count">{postcard.likeCount}</span>
                </span>
                
                <span className="commentUI">
                    <img src={CommentIcon}
                        width="25"
                        height="25"
                        alt="Noft Custom Icon"/>
                    <span className="count">{postcard.commentCount}</span>
                </span>
            </Card.Text>

            <Button onClick={openBloblUrl} data-asset-url={postcard.asset} data-asset-filename={trimFilename(postcard.asset)} variant="primary">Download</Button>
            </Card.Body>
        </Card>
    )
}