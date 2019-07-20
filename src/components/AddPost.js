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

    addPost() {
        console.log("adding post");
        axios.post('https://api-yelbdjwpjh.now.sh/posts', {
            title: this.state.title,
            body: this.state.body
        })
            .then(function (response) {
                console.log('reponse from add post is ', response);
                // hashHistory.push('/')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <form action="#" className="NewPostForm">
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

