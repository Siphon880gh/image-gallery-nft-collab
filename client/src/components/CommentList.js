import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';

const CommentList = ({ comments }) => {

    return (<React.Fragment>
        <h2>Comments</h2>
        <CardGroup>
            <Card.Body >
                {comments &&
                    comments.map(comments => (
                        <p key={comments._id}>
                           " {comments.commentBody} " - {' '}
                            <Link to={`/profile/${comments.author}`} style={{ fontWeight: 700 }}>
                                {comments.author}</Link></p>
                    ))}
            </Card.Body>
        </CardGroup>

    </React.Fragment>);
};

export default CommentList;