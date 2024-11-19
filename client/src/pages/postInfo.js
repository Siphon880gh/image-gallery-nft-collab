// Create a skeletal structure of what our addPost page will look like
// Set up imports at the top
import React from 'react';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

// Create a const for postForm that'll return JSX
const postInfo = () => {

    // Return JSX
    return (
        <div>
            <div>
                {/* Reprint Title Here */}
                <h1>Reprint Title Example</h1>
            </div>
            
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
                </Card.Body>
            </Card>
        </div>
    )
}
// Export addPost
export default postInfo;

