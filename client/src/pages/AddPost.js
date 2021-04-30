// Create a skeletal structure of what our addPost page will look like
// Set up imports at the top
import React, { useState } from "react";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'
// Generate random hash for filenames
import generateHash from 'random-hash';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Auth from "../utils/auth";

let signedIn = false;


// Create a const for postForm that'll return JSX
const AddPost = props => {

    // Return JSX
    return (
        <div>
            <div>
                <h1>Post A Reprint!</h1>
            </div>

            <Form>
                {/* Choose File Button */}
                <Form.Group>
                    <Form.File id="chooseFile" label="Import A File:" />
                </Form.Group>

                {/* Add A Title */}
                <Form.Group controlId="titleInput">
                    <Form.Label>Add A Title:</Form.Label>
                    <Form.Control />
                </Form.Group>

                {/* Add Market Listing */}
                <Form.Group controlId="marketListing">
                    <Form.Label>Add Market Listing:</Form.Label>
                    <Form.Control placeholder="https://www.example.com/" />
                </Form.Group>


                {/* Captions */}
                <Form.Group controlId="captionInput">
                    <Form.Label>Add A Caption:</Form.Label>
                    <Form.Control as="textarea" placeholder="Optional: Add a caption!" rows={3} />
                </Form.Group>

                {/* Submit */}
                <Button variant="primary" type="submit">
                    Post
                </Button>

            </Form>
        </div>
    )
}

export default AddPost;