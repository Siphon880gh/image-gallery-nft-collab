// Create a skeletal structure of what our addPost page will look like
// Set up imports at the top
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';

import "./AddPost.css";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'

// Generate random hash for filenames
import generateHash from 'random-hash';

// Import Auth
import Auth from "../utils/auth";

// GraphQL
import { useMutation } from '@apollo/react-hooks';
import { ADD_REPRINT } from "../utils/mutations";

// Globals that are needed
let googleCloudSignedIn = false;

// Turn on debug flag for state debugging in run time
let debug = false;

// Upload Form Component
export default function AddPost(props) {

    // Initialize graphQL
    const [addReprint] = useMutation(ADD_REPRINT);

    // Initialize Firebase
    const firebaseConfig = Auth.getGoogleStorage()
    if (!firebase.apps.length) {
        try {
            firebase.initializeApp(firebaseConfig)
        } catch (err) {
            console.error("Firebase initialization error raised", err.stack)
        }
    }

    // Firebase gets initialized, then gets authenticated
    if (!googleCloudSignedIn) {

        const firebaseAuthDetails = Auth.getGoogleAuth()

        firebase.auth().signInWithEmailAndPassword(...firebaseAuthDetails)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                throw JSON.stringify({ errorCode, errorMessage });
            });
        googleCloudSignedIn = true;
    }

    // Get a reference to the storage service, which is used to create references in your storage bucket
    const uniqueFilename = Math.floor(new Date().getTime()) + generateHash({ length: 6 }) + ".jpg";

    const storageRef = firebase.storage().ref().child(uniqueFilename);

    // State to keep track of form
    const initialState = {
        selectedFile: "",
        title: "",
        market: "",
        caption: ""
    }
    const [state, setState] = useState(initialState);

    // On input changes, update state
    const onFileChange = event => {
        setState({
            ...state,
            selectedFile: event.target.files[0]
        });
    };
    const onTitleChange = (event) => {
        setState({
            ...state,
            title: event.target.value
        });
    };
    const onMarketChange = (event) => {
        setState({
            ...state,
            market: event.target.value
        });
    };
    const onCaptionChange = (event) => {
        setState({
            ...state,
            caption: event.target.value
        });
    };

    // Form validation using state
    const [validated, setValidated] = useState(false);

    // On submit, send state to cloud server and models
    const onPostSubmit = async (event) => {

        // Prevent default of refreshing the page
        event.preventDefault();
        event.stopPropagation();

        // Form client validation
        const form = event.currentTarget;
        setValidated(true);
        if (form.checkValidity()) {

            // Definition: Send file to cloud
            async function sendToCloud() {

                return await storageRef.put(state.selectedFile)
                    .then((snapshot) => {
                        // console.log("Uploading started");
                        return snapshot.ref.getDownloadURL();
                    }).then(asset => {
                        // console.log('Uploaded:');
                        // console.log({ asset });

                        return asset;
                    })
                    .catch(error => {
                        throw error;
                    });
            }

            // Definition: Send to Mongoose and then Reroute
            async function sendToMongooseAndReroute() {
                try {
                    const response = await addReprint({
                        variables: {
                            asset: asset,
                            title: state.title,
                            marketListing: state.market,
                            caption: state.caption
                        }
                    }).catch(err => {
                        console.error(err);
                    });

                    if (response) {
                        const _id = await response?.data?.addReprint?._id ? response?.data?.addReprint?._id : null;
                        if (_id) {
                            // console.log("Updated Mongoose");
                            // console.log({_id});
                            window.location.href = `/app/image-gallery-nft-collab/post/${_id}`;
                        } else {
                            console.error("Mongoose Error: Adding reprint failed")
                        }
                    } else {
                        console.error("Mongoose Error: Adding reprint failed")
                    }
                } catch (err) {
                    console.error(err);
                }

            }

            // Check if authorized
            if (!Auth.loggedIn()) {
                console.error("You're not logged in");
                return;
            }

            // Check if uploading a file (Required)
            if (state.selectedFile.length === 0) {
                console.error("You didn't upload a file!");
                return;
            }

            // Updating Cloud server
            const asset = await sendToCloud();
            // console.log("Awaited asset:", asset);

            // Updating Mongoose and then reroute
            sendToMongooseAndReroute();

        } // checkValidity

    }; // onPostSubmit

    // Display image information after file upload completes
    const fileData = () => {
        if (state.selectedFile) {
            // console.log(state.selectedFile);
            return (
                <div className="preview">
                    <Card className="preview-details mt-3" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Img variant="top" src={URL.createObjectURL(state.selectedFile)} />
                            <Card.Text>Filename: {state.selectedFile.name} </Card.Text>
                            <Card.Text>File Type: {state.selectedFile.type} </Card.Text>
                            <Card.Text>Last Modified: {" "} {state.selectedFile.lastModifiedDate.toDateString()} </Card.Text>
                        </Card.Body>
                    </Card>

                </div>
            );
        }
    }; // Form Data

    // Return JSX
    return (
    <Row className="add-post-page mt-3 ml-0 mr-0">

            <Col className="pl-3 pr-3 center-block" xs={12} sm={10} md={8} lg={10} >

                <Form className="add-post-form" noValidate validated={validated} onSubmit={onPostSubmit}>
                    <h1 className="add-post-title text-center">Post a Reprint</h1>

                    {/* Choose File Button */}
                    <Form.Group>
                        <Form.Label>Choose your image file:</Form.Label>
                        <Form.Control type="file" onChange={onFileChange} accept="image/*" required />
                        <Form.Control.Feedback type="invalid">
                            Please select a file.
                        </Form.Control.Feedback>

                        <aside>
                            {fileData()}
                        </aside>
                    </Form.Group>

                    {/* Add A Title */}
                    <Form.Group controlId="titleInput">
                        <Form.Label>Add A Title:</Form.Label>
                        <Form.Control onInput={onTitleChange} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a title.
                            </Form.Control.Feedback>
                    </Form.Group>

                    {/* Add Market Listing */}
                    <Form.Group controlId="marketListing">
                        <Form.Label>Add Market Listing:</Form.Label>
                        <Form.Control placeholder="https://www.example.com/"
                            onInput={onMarketChange}
                            pattern="^https.*"
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a properly formatted market listing URL. It must have a https protocol because all NFT salespages are in https. For example: https://niftygateway.com/collections/SALES_PAGE
                            </Form.Control.Feedback>
                    </Form.Group>


                    {/* Captions */}
                    <Form.Group controlId="captionInput">
                        <Form.Label>Add A Caption (optional):</Form.Label>
                        <Form.Control as="textarea" placeholder="Optional: Add a caption!" rows={3} onInput={onCaptionChange} />
                    </Form.Group>

                    {/* Submit */}
                    <Button variant="primary" type="submit" value="Submit"> Add Reprint! </Button>

                    {
                        debug ? (
                            <article>
                                <h2> Debug Form State: </h2>
                                <div><label>Title:</label><span>{state.title}</span></div>
                                <div><label>Market:</label><span>{state.market}</span></div>
                                <div><label>Caption:</label><span>{state.caption}</span></div>
                            </article>
                        ) : ""
                    }
                </Form>
            
            </Col>
    </Row>
    )
}