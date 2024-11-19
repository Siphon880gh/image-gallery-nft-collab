import React from 'react';
import {Container} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';

// PostInfo same level components
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

// PostInfo Component dependencies
import Auth from '../utils/auth';
import { GET_SINGLE_CARD } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

// Styling
import "./PostInfo.css";

// Subcomponents
import Likes from '../components/Like';
import FavoriteButton from '../components/FavoriteButton';

// Get favorite Ids to compare against post to see if favorite (placed here instead of inside FavoriteButton to workaround Reacth render limit error)
import { MY_FAVORITES } from "../utils/queries";

import LoadingSpindle from "../assets/spinner-1.3s-200px.png";

// Create a const for postForm that'll return JSX
export default function PostInfo() {
    // Get post info
    let { noftId } = useParams();
    const { loading: postLoading, data } = useQuery(GET_SINGLE_CARD, {
        variables: { noftId: noftId }
    });
    const singleReprint = data?.reprintById || {};

    // User's favorite Ids. Return empty array if not logged in
    let { loading: favoriteIdsLoading, data: favoritesData } = useQuery(MY_FAVORITES);
    let favoritesList = favoritesData?.myFavorites?.favorites || [];
    let favoritedIds = favoritesList.map(favObj => favObj._id);

    if (!noftId)
        return <div className="text-danger bg-warning p-3 m-5">Error: Malformed URL. Please press back. Did you mean to visit a post URL? It's missing a Post ID in the URL.</div>
    else if (postLoading || favoriteIdsLoading) {
        return <div><img src={LoadingSpindle}></img></div>;
    } else
        return (
            <Container>
                <section className="mt-5 text-center">
                    <h1>{singleReprint.title}</h1>
                </section>

                <Image src={singleReprint.asset} fluid className="center-block mt-5 mb-5" />

                {singleReprint.caption &&
                (
                    <Card>
                        <Card.Body>{singleReprint.caption}</Card.Body>
                    </Card>
                )}

                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title>
                            <label className="reprint-detail-label">Author:</label>
                            <a href={`/app/image-gallery-nft-collab/profile/${singleReprint.author}`}>{singleReprint.author}</a
                        ></Card.Title>
                        <Card.Title>
                            <label className="reprint-detail-label">NFT Market URL:</label>
                            <Card.Link href={`${singleReprint.marketListing}`}>{singleReprint.marketListing}</Card.Link>
                        </Card.Title>
                        <Likes singleReprint={singleReprint} noftId={noftId}></Likes>
                        {Auth.loggedIn() && !favoriteIdsLoading && (
                            <FavoriteButton noftId={noftId} favoritedIds={favoritedIds}></FavoriteButton>
                        )}
                    </Card.Body>
                </Card>


                {singleReprint.commentCount > 0 && <CommentList comments={singleReprint.comments} />}

                {Auth.loggedIn() && <CommentForm reprintId={singleReprint._id} />}
            </Container>
        );
};