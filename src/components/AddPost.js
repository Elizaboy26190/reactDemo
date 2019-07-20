import React, { Component } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";


class AddPost extends Component {

    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.state = {
            title: '',
            body: '',
            posts: []
        };
    }


    handleTitleChange(e) {
        console.log("title changed to " + e.target.value)
        this.setState({title: e.target.value})
    }

    handleBodyChange(e) {
        console.log("body changed to " + e.target.value)

        this.setState({body: e.target.value})
    }

    addPost(event) {
    event.preventDefault();

    console.log("adding post");
     const { title, body} = this.state;

            return axios.post('https://api-yelbdjwpjh.now.sh/posts', {
                title,
                body
            }).then(function (response) {
                    console.log('reponse from add post is ', response);
        }).then(res=>{

                axios.get('https://api-yelbdjwpjh.now.sh/posts/?_embed=comments')
                    .then(res => {
                        const new_res_data = res.data.sort((a,b)=> a.createdAt<b.createdAt?1:-1);
                        this.setState({posts:new_res_data});
                        localStorage.setItem('posts',JSON.stringify(new_res_data))
                    }).then(a=>{
                    console.log("posts = "+this.state.posts);

                });
            }).then(res=>{
                axios.get('https://api-yelbdjwpjh.now.sh/users')
                    .then(res => {
                        // console.log(res);
                        this.setState({users: res.data});
                        localStorage.setItem('users',JSON.stringify(res.data))
                    }).then(a=>{
                    console.log("users = "+this.state.users);

                });
            })
                .then(res=>{
                    localStorage.setItem('reloadRequired',true);
            // need to update posts in our local storage. If we know we are the only one we could just add the post to the main posts array by pushing,. however in this case we can't as we may have other users piushing to the apis so we should update by calling posts.
        window.location.reload()})

    }

    render() {
        return (
            <form className="NewPostForm">
                <input
                    className="NewPostForm-title"
                    name="title"
                    type="text"
                    placeholder="title"
                    onChange={this.handleTitleChange}
                />
                <textarea
                    className="NewPostForm-body"
                    name="body"
                    cols="30"
                    rows="4"
                    placeholder="content"
                    onChange={this.handleBodyChange}
                />
                <div className="NewPostForm-actions">
                    <button className="Button" onClick={this.addPost}>Add Story</button>
                </div>
            </form>
        )
    }
}
export default AddPost

