import React, { Component } from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'


class Post extends Component {
    state = {
        id: null,
        // user_comments:[],
    }

    componentDidMount(){
        console.log("props = "+this.props);
        let id = this.props.match.params.id;

            axios.get('https://api-yelbdjwpjh.now.sh/posts/' +id+'?_expand=user')
            .then(res => {
                this.setState({post_user: res.data});
                // this.setState({isUpdatingPosts: false});
            })

        axios.get('https://api-yelbdjwpjh.now.sh/comments?postId='+id)
            .then(res => {
                this.setState({comments: res.data});
                // this.setState({isUpdatingPosts: false});
            })
            .then(res=> {
                console.log("com = "+this.state.comments);
                let responses = [];
                var promises = this.state.comments.map(comment =>
                    fetch('https://api-yelbdjwpjh.now.sh/users/'+comment.userId)
                        .then(res => res.json())
                        .catch(error => console.log('There was a problem!', error))
                )

                Promise.all(promises).then(results => {
                    console.log("res = "+Array.from(results));
                    this.setState({commentUsers: (results)});
                });

            })

    }
    render() {
        // console.log((this.user)?"user found":"waiting");
        // console.log("user = "+JSON.stringify(this.state.post.user));
        if (!(this.state.post_user&&this.state.comments&&this.state.commentUsers)){
        return <div className="center">Loading post...</div>;
        }
        // console.log("post = "+JSON.stringify(this.state.post_user));
        // console.log("post = "+JSON.stringify(this.state.comments));
        // console.log("Users = "+JSON.stringify(this.state.commentUsers));


        const userName = (this.state.post_user)?this.state.post_user.user.name:"";
        const post = (this.state.post_user)?(
            <div className="Post" key={`${this.state.post_user.id}`}>
                <div className="Post-title"><Link to={`/posts/${this.state.post_user.id}`}>{this.state.post_user.title}</Link></div>
                <div className="Post-description"><p>{this.state.post_user.body}</p></div>
                <div className="Post-author">
                    <div className="ProfilePhoto">
                        <img src={`${this.state.post_user.user.photo_url}`} alt="." />
                    </div>
                    <div className="Post-author-name">
                        <small>posted by:</small>
                        {userName}
                    </div>
                </div>
            </div>
        ):(<div className="center">Loading post...</div>)

// console.log(this.state.post_comments.)
        const comments = (this.state.comments&&this.state.commentUsers)?this.state.comments.map((comment,i)=>{
            const user = this.state.commentUsers[i];
            return(
                <div className="Comment" key={`${comment.id}`}>
                    <div className="ProfilePhoto">
                        <img src={`${user.photo_url}`} alt="" />
                               </div>
                               <div className="Comment-details">
                                 <div className="Comment-authorName">{user.name}</div>
                                 <div className="Comment-text">{comment.body}</div>
                               </div>
                             </div>
            )
            }):(<div className="center">Loading comments...</div>);

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