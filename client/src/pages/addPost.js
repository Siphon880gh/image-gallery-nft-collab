// Create a skeletal structure of what our addPost page will look like
// Set up imports at the top
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Create a const for postForm that'll return JSX
const postForm = () => {

    // Return JSX
    return (
        <div>
            <Form>

                {/* Choose File Button */}
                <Form.Group>
                    <Form.File id="chooseFile" label="Import A File:" />
                </Form.Group>

                {/* Add A Title */}
                <Form.Group controlId="titleInput">
                    <Form.Label>Add A Title:</Form.Label>
                    <Form.Control/>
                </Form.Group>

                {/* Add An Author */}
                <Form.Group controlId="authorInput">
                    <Form.Label>Add An Author:</Form.Label>
                    <Form.Control/>
                </Form.Group>

                {/* Add Market Listing */}
                <Form.Group controlId="marketListing">
                    <Form.Label>Add Market Listing:</Form.Label>
                    <Form.Control placeholder="https://www.example.com/" />
                </Form.Group>


                {/* Captions */}
                <Form.Group controlId="captionInput">
                    <Form.Label>Add A Caption:</Form.Label>
                    <Form.Control as="textarea" placeholder="Optional: Add a caption!"rows={3} />
                </Form.Group>

                {/* Submit */}
                <Button variant="primary" type="submit">
                    Post
                </Button>

            </Form>
        </div>
    )
}
// Export addPost
export default postForm;