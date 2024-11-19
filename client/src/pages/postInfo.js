// Create a skeletal structure of what our addPost page will look like
// Set up imports at the top
import React from 'react';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { GET_SINGLE_CARD } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';


// Create a const for postForm that'll return JSX
export function PostInfo() {
    let { title } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_CARD, {
        variables: { title }
    });
    const singleReprint = data?.reprint || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    // Return JSX
    return (
        <div>
            <section>
                <h1>{singleReprint.title}</h1>
            </section>

            <Image src={singleReprint.asset} fluid />

            <Card>
                <Card.Body>{singleReprint.caption}</Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title><Card.Link href={`/profile/${singleReprint.author}`}>{singleReprint.author}</Card.Link></Card.Title>
                    <Card.Title><Card.Link href={`${singleReprint.marketListing}`}>{singleReprint.marketListing}</Card.Link></Card.Title>
                    <Card.Title>{singleReprint.caption}</Card.Title>
                    <Card.Title><span role="img" aria-label="like emoji">👍</span>{singleReprint.likeCount}</Card.Title>
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
    );
};
// Export addPost
export default PostInfo;

