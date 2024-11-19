import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../utils/mutations';

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
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
        {error && <span>Something went wrong...</span>}
            </p>
            <form
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a comment about this NoFT..."
                    value={commentBody}
                    onChange={handleChange}
                ></textarea>

                <button type="submit">
                    Submit
        </button>
            </form>

            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default CommentForm;
