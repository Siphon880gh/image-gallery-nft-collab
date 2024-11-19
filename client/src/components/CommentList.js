import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {

    return (<React.Fragment>
        <div>
            <div>
                <h2>Comments</h2>
            </div>
            <div >
                {comments &&
                    comments.map(comments => (
                        <p key={comments._id}>
                            {comments.commentBody} //{' '}
                            <Link to={`/profile/${comments.author}`} style={{ fontWeight: 700 }}>
                                {comments.author}</Link> on {comments.createdAt}

                        </p>
                    ))}
            </div>
        </div>

    </React.Fragment>);
};

export default CommentList;