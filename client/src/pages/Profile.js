import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import {
  Modal,
  Container,
  Card,
  CardColumns,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USER, GET_ME } from "../utils/queries";
import { FOLLOW, UNFOLLOW, DELETE_USER_V2 } from "../utils/mutations";

import Auth from "../utils/auth";

import PostCard from "../components/PostCard";
import "./Profile.css";

import LoadingSpindle from "../assets/spinner-1.3s-200px.png";

const Profile = (props) => {
  const { username: userParam } = useParams();

  let { loading, data: user, refetch } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam },
  });

  // GraphQL profile information requests
  const { loading: loadingTheirUserInfo, data: theirUserInfo } = useQuery(
    GET_USER,
    {
      variables: { username: userParam ? userParam : "" },
    }
  );
  const theirFollowers = theirUserInfo?.author?.followers || [];
  const [amIAFollower, updateFollowStatus] = useState(
    theirFollowers && Auth.getProfile()
      ? theirFollowers.includes(Auth.getProfile().data._id)
      : {}
  );
  const [showDeleteMeModal, setShowDeleteMeModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowedModal, setShowFollowedModal] = useState(false);

  // const user = data?.me || data?.author || {};
  user = user?.me || user?.author || {};
  const [follow] = useMutation(FOLLOW, {
    onCompleted: data => {
      // console.log("Updated followers.");
      // console.log(data);
    },
    onError: data => {
      console.error(data)
    },
  });
  const [unfollow] = useMutation(UNFOLLOW, {
    onCompleted: data => {
      // console.log("Updated followers.");
      // console.log(data)
    },
    onError: data => {
      console.error(data)
    },});
  const [deleteMe] = useMutation(DELETE_USER_V2);


  useEffect(() => {
    // Following triggered, so go refetch the followers list
    refetch();
  }, [amIAFollower])

  // In the case you deleted your profile or the user doesnt exist
  // if(typeof user==="undefined" || Object.keys(user).length === 0) {
  if (!user) {
    return <Redirect to="/" />;
  }

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div><img src={LoadingSpindle}></img></div>;
  }

  const handleFollow = async () => {
    if (amIAFollower) {
      try {
        await unfollow({
          variables: { followedId: user._id },
        });
        updateFollowStatus(false);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await follow({
          variables: { followedId: user._id },
        });
        updateFollowStatus(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  function RenderFollowButton() {
    if (amIAFollower) {
      return (
        <button className="follow-btn mb-4" onClick={handleFollow}>
          Unfollow
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-primary follow-btn mb-4"
          onClick={handleFollow}
        >
          Follow
        </button>
      );
    }
  } // RenderFollowButton


  return (
    <>
      {loadingTheirUserInfo ? (
        <div><img src={LoadingSpindle}></img></div>
      ) : (
        <Container className="profile">
          <Card className="profile-stats">
            <div className="pt-3">
              <h1>
                Viewing {userParam ? `${user.username}'s` : "your"} profile
              </h1>
            </div>
            <div className="p-2">
              {user.followerCount > 0 ? (
                <p>
                  <span
                    className="link"
                    onClick={() => setShowFollowersModal(true)}
                  >
                    Followers: {user.followerCount}
                  </span>
                </p>
              ) : (
                <p>Followers: {user.followerCount}</p>
              )}
              {user.followedCount > 0 ? (
                <p>
                  <span
                    className="link"
                    onClick={() => setShowFollowedModal(true)}
                  >
                    Followed: {user.followedCount}
                  </span>
                </p>
              ) : (
                <p>Followed: {user.followedCount}</p>
              )}
              <p>Total Reprints: {user.reprintCount}</p>
              <p>Total Favorite Counts: {user.favoriteCount}</p>
            </div>

            {Auth.loggedIn() && userParam && <RenderFollowButton />}

            <div className="your-reprints">
              <h2 className="pt-3 pb-3 pl-0 ml-0">
                {userParam ? `${user.username}'s` : "Your"} NoFTs:
              </h2>
              <CardColumns>
                {user.reprints.map((userReprint, itrIndex) => {
                  return (
                    <PostCard
                      key={userReprint._id}
                      postcard={userReprint}
                    ></PostCard>
                  );
                })}
              </CardColumns>
            </div>

            {Auth.loggedIn() && !userParam && (
              <>
                <div className="mt-5 float-right">
                  <Button
                    onClick={() => setShowDeleteMeModal(true)}
                    variant="warning"
                  >
                    Delete Me
                  </Button>
                </div>
                <div className="clearfix" />
              </>
            )}

            {/* Delete Me Modal */}
            <Modal
              size="lg"
              show={showDeleteMeModal}
              onHide={() => setShowDeleteMeModal(false)}
              aria-labelledby="delete-me-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title id="delete-me-modal">Account Removal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="text-center pt-3 pb-3">
                  Delete your account? This cannot be reversed.
                </p>
                <Button
                  className="float-right"
                  onClick={() => setShowDeleteMeModal(false)}
                  variant="light"
                >
                  Cancel
                </Button>
                <div className="float-right" style={{ width: "25px" }}>
                  &nbsp;
                </div>
                <Button
                  className="float-right"
                  onClick={() => {
                    // Deleting User Profile:

                    // Revoke on the backend
                    const deleted = deleteMe();

                    // Revoke on the frontend
                    if (deleted) setTimeout(Auth.permanentlyRevoke, 1000);
                  }}
                  variant="danger"
                >
                  Delete
                </Button>
              </Modal.Body>
            </Modal>

            {/* Followers Modal */}
            <Modal
              id="followers-modal"
              size="lg"
              show={showFollowersModal}
              onHide={() => setShowFollowersModal(false)}
              aria-labelledby="followers-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title id="followers-modal">Followers</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ListGroup className="mb-2">
                  {user.followers.map((listee, itrIndex) => {
                    return (
                      <ListGroup.Item key={listee._id}>
                        <a
                          className="listee-detail-label"
                          href={"/app/image-gallery-nft-collab/profile/" + listee.username}
                        >
                          {listee.username}
                        </a>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Modal.Body>
            </Modal>

            {/* Followed Modal */}
            <Modal
              id="followed-modal"
              size="lg"
              show={showFollowedModal}
              onHide={() => setShowFollowedModal(false)}
              aria-labelledby="followed-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title id="followed-modal">Followed</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ListGroup className="mb-2">
                  {user.followed.map((listee, itrIndex) => {
                    return (
                      <ListGroup.Item key={listee._id}>
                        <a
                          className="listee-detail-label"
                          href={"/app/image-gallery-nft-collab/profile/" + listee.username}
                        >
                          {listee.username}
                        </a>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Modal.Body>
            </Modal>
          </Card>
        </Container>
      )}
    </>
  );
};

export default Profile;
