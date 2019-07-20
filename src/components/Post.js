import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {fetchNewData} from "./DataFunctions";

class Post extends Component {
    // Local state variable for reference
    state = {
        id: null,
    }

    // Function to load once the component is mounted.
    // This fetches data if needed and sets the id within our state
    componentDidMount() {
        let id = this.props.match.params.id;
        this.setState({id: id});
        fetchNewData(this);
    }

    // Render HTML
    render() {
        // Store our local variables
        const {posts} = this.state
        const {users} = this.state
        const {id} = this.state

        // Provide a useful message if the posts or users are not ready yet
        if (!users || !posts) {
            return <div className="center">Loading post...</div>;
        }
        // Get the post from our storage and the id
        const postContent = posts[posts.length - id];

        // Get the post's author object and name to help make referencing easier later
        const user = users[postContent.userId - 1];
        const userName = (user) ? user.name : "";

        // Get the post's body and wrap each paragraph in a paragraph element
        const body = postContent.body.split('\n').map((paragraph, i) => {
            return <p key={i}>{paragraph}</p>
        });

        // If we have the information for the post we can create our HTML for the post
        const post = (postContent) ? (
            <div className="Post" key={`${id}`}>
                <div className="Post-title"><Link to={`/posts/${id}`}>{postContent.title}</Link></div>
                <div className="Post-description">
                    {body}
                </div>
                <div className="Post-author">
                    <div className="ProfilePhoto">
                        <img src={`${user.photo_url}`} alt="."/>
                    </div>
                    <div className="Post-author-name">
                        <small>posted by:</small>
                        {userName}
                    </div>
                </div>
            </div>
        ) : (<div className="center">Loading post...</div>)

        // All the comments for the post
        const fullPostComments = postContent.comments;

        // Create the HTML for the comments
        const comments = (posts && users) ? postContent.comments.map((comment, i) => {
            // User for a particular comment
            const commentUser = fullPostComments[i].userId;
            // Mapping the body content to create the new paragraph
            const body = comment.body.split('/n').map((paragraph, i) => {
                return <p key={i}>{paragraph}</p>
            });

            // Return the HTML content for each comment element or a helpful message if we are not ready yet
            return (
                <div className="Comment" key={`${comment.id}`}>
                    <div className="ProfilePhoto">
                        <img src={`${users[commentUser - 1].photo_url}`} alt=""/>
                    </div>
                    <div className="Comment-details">
                        <div className="Comment-authorName">{users[commentUser - 1].name}</div>
                        <div className="Comment-text">
                            {body}
                        </div>
                    </div>
                </div>
            )
        }) : (<div className="center">Loading comments...</div>);

        // Return the rendered HTML
        return (
            <div>
                {post}
                <div className="Comments">
                    <div className="CommentsList">
                        {comments}
                    </div>
                </div>
            </div>

        )
    }
}

export default Post