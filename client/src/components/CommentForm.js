import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../utils/mutations';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CommentForm = ({ reprintId }) => {
    const [commentBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    // update state based on form input changes
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addComment({
                variables: { commentBody, reprintId }
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <React.Fragment>
            <Form onSubmit={handleFormSubmit} >

                <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                    Character Count: {characterCount}/280
                    {error && <span>Something went wrong...</span>}
                </p>

                <Form.Group controlId="commentForm" value={commentBody} onChange={handleChange}>
                    <Form.Control placeholder="Leave a comment about this NoFT..." as="textarea" rows={3} />
                </Form.Group>

                {/* <textarea
                    placeholder="Leave a comment about this NoFT..."
                    value={commentBody}
                    onChange={handleChange}
                ></textarea> */}

                <Button variant="primary" type="submit">Submit</Button>
            </Form>

            {error && <div>Something went wrong...</div>}
        </React.Fragment>
    );
};

export default CommentForm;
