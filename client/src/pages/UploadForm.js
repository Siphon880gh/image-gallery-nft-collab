/**
 * @file
 * Upload image form.
 * - There's an input to chooose/select the file. That will save to state
 * - Then there's a button to upload the selected file. That will connect to the cloud server like Firebase.
 * 
 */
import React, { useState } from "react";
// const { Storage } = require('@google-cloud/storage');

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'

// Generate random hash for filenames
import generateHash from 'random-hash';
import process from "process";

import Auth from "../utils/auth";

let signedIn = false;

// Upload Form component
export default function UploadForm(props) {

    const firebaseConfig = Auth.getGoogleStorage()
    // console.log({firebaseConfig});

    // Initialize Firebase
    if (!firebase.apps.length) {
        try {
            firebase.initializeApp(firebaseConfig)
        } catch (err) {
            console.error("Firebase initialization error raised", err.stack)
        }
    }

    if (!signedIn) {
        const firebaseAuthDetails = Auth.getGoogleAuth()
        // console.log({firebaseAuthDetails});

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
        signedIn = true;
    }


    // Get a reference to the storage service, which is used to create references in your storage bucket
    const uniqueFilename = Math.floor(new Date().getTime()) + generateHash({ length: 6 });
    const storageRef = firebase.storage().ref().child(uniqueFilename);

    // State to keep track of selected file
    const initialState = {
        // Initial: No file selected
        selectedFile: null
    }
    const [state, setState] = useState(initialState);

    // On file select, update the state with the filepath the user chose from their Finder or File Explorer
    const onFileChange = event => {
        setState({ selectedFile: event.target.files[0] });
    };

    // On file upload, send the selected file to the cloud server
    const onFileUpload = async () => {

        // Create formData data from state to be sent to cloud server
        const formData = new FormData();
        formData.append(
            "myFile",
            state.selectedFile,
            state.selectedFile.name
        );
        // console.log(state.selectedFile);


        await storageRef.put(state.selectedFile)
            .then((snapshot) => {
                // console.log("Uploading started");
                return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                // console.log('Uploaded:');
                // console.log({ asset: downloadURL });

                //TODO: Send downloadURL to mongoose, probably using a mutation


            }).catch(error => {
                throw error;
            });

    }; // onFileUpload

    // Display image after file upload completes
    const fileData = () => {

        if (state.selectedFile) {

            return (<div >
                <h2> Image Selected from computer: </h2>

                <p> Filename: {state.selectedFile.name} </p>


                <p> File Type: {state.selectedFile.type} </p>


                <p>Last Modified: {" "} {state.selectedFile.lastModifiedDate.toDateString()} </p>

            </div>
            );
        } else {
            return (<div>
                <br />
                <h4> Choose file, then upload! </h4> </div>
            );
        }
    }; // formData


    // Render upload form
    return (
        <div>
            <h1>
                Upload Image
             </h1>

            <div>
                <input type="file" onChange={onFileChange} accept="image/*" />
                <button onClick={onFileUpload} >
                    Upload!
                 </button>
            </div>

            <aside>
                {fileData()}
            </aside>

            <article >
                <h2 > Debug Google Cloud Service Account details: </h2>
                <p > {process.env.GOOGLE_APPLICATION_CREDENTIALS} </p>
            </article>
        </div>
    )
}