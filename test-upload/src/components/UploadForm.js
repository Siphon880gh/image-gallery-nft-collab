/**
 * @file
 * Upload image form.
 * - There's an input to chooose/select the file. That will save to state
 * - Then there's a button to upload the selected file. That will connect to the cloud server like Firebase.
 * 
 */
import React, {useState} from "react";

export default function UploadForm(props) {
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
    const onFileUpload = () => {
        
        // Create formData data from state to be sent to cloud server
        const formData = new FormData();
        formData.append(
            "myFile",
            state.selectedFile,
            state.selectedFile.name
        );
        console.log(state.selectedFile);
        
        // TODO: Make request to cloud server
        // Send formData object
        
    }; // onFileUpload
    
    // Display image after file upload completes
    const fileData = () => {
        
        if (state.selectedFile) {
            
            return (
            <div>
                <h2>Image Selected from computer:</h2>
                
    <p>Filename: {state.selectedFile.name}</p>

                
    <p>File Type: {state.selectedFile.type}</p>

                
    <p>
                Last Modified:{" "}
                {state.selectedFile.lastModifiedDate.toDateString()}
                </p>

            </div>
            );
        } else {
            return (
            <div>
                <br />
                <h4>Choose file, then upload!</h4>
            </div>
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
                <input type="file" onChange={onFileChange} accept="image/*"/>
                <button onClick={onFileUpload}>
                  Upload!
                </button>
            </div>
          {fileData()}
        </div>
    )
}