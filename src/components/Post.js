import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {fetchNewData} from "./getData";


class Post extends Component {
    state = {
        id: null,
    }

    componentDidMount() {
        console.log("props = " + this.props);
        let id = this.props.match.params.id;
        this.setState({id: id});
        fetchNewData(this);

    }

    render() {

        const {posts} = this.state
        const {users} = this.state
        const {id} = this.state

        if (!users || !posts) {
            return <div className="center">Loading post...</div>;
        }
        const full_post = posts[posts.length - id];
        if (!full_post) {
            return <div className="center">Loading individual post...</div>;
        }
        console.log(id)
        const user = users[full_post.userId - 1];
        console.log(user);
        const userName = (user) ? user.name : "";
        console.log(userName);
        const body = full_post.body.split('\n').map((paragraph, i) => {
            return <p key={i}>{paragraph}</p>
        });
        console.log("bod = " + body);
        const post = (full_post) ? (
            <div className="Post" key={`${id}`}>
                <div className="Post-title"><Link to={`/posts/${id}`}>{full_post.title}</Link></div>
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
        ) : (<div className="center">Loading post2...</div>)
        const full_post_comments = full_post.comments;
        // console.log(full_post_comments[0].userId);

        const comments = (posts && users) ? full_post.comments.map((comment, i) => {
            const com_user = full_post_comments[i].userId;
            console.log(com_user);
            const body = comment.body.split('/n').map((paragraph, i) => {
                return <div className="Comment-text" key={i}>{paragraph}</div>
            });
            console.log("body = " + body);
            return (
                <div className="Comment" key={`${comment.id}`}>
                    <div className="ProfilePhoto">
                        <img src={`${users[com_user - 1].photo_url}`} alt=""/>
                    </div>
                    <div className="Comment-details">
                        <div className="Comment-authorName">{users[com_user - 1].name}</div>
                        {body}
                    </div>
                </div>
            )
        }) : (<div className="center">Loading comments...</div>);

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