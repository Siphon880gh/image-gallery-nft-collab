// Create a skeletal structure of what our addPost page will look like
// Set up imports at the top
import React from 'react';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Create a const for postForm that'll return JSX
const postInfo = () => {

    // Return JSX
    return (
        <div>
            <section>
                {/* Reprint Title Here */}
                <h1>Reprint Title Example</h1>
            </section>
            
            <Image src="holder.js/100px250" fluid />
            
            <Card>
                <Card.Body>Caption:</Card.Body>
            </Card>
           
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Author:</Card.Title>
                    <Card.Title>Market Listing:</Card.Title>
                    <Card.Title>Caption:</Card.Title>
                    <Card.Title>Likes:</Card.Title>
                    <Card.Title>Favorited This Many Times:</Card.Title>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header> <h3> Comment Section: </h3> </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                            Comment Text: {' '}
                    </p>
                    <footer className="blockquote-footer">
                        Different User:
                    </footer>
                    </blockquote>
                </Card.Body>
            </Card>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label><h3>Add A Comment:</h3></Form.Label>
                <Form.Control placeholder="Share your thoughts..." as="textarea" rows={3} />
                {/* Submit */}
                <Button variant="primary" type="submit">
                    Post Comment
                </Button>
            </Form.Group>
        </div>
    )
}
// Export addPost
export default postInfo;

