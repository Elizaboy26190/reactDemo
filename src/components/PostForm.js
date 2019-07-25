import React, {Component} from 'react'
import axios from 'axios'
import {appUrl, fetchNewData} from "./DataFunctions";

// Component to render the form to create new posts.
class PostForm extends Component {

    // Set up the constructor in order to bind the necessary events and update the page if needed.
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

    // Function to handle setting the value for the title within our state
    handleTitleChange(e) {
        this.setState({title: e.target.value})
    }

    // Function to handle setting the value for the body within our state
    handleBodyChange(e) {
        this.setState({body: e.target.value})
    }

    // Function to handle the form submission.
    addPost(event) {
        // Prevent the frame from reloading before the response is done to refresh the page.
        event.preventDefault();
        // Access our local state variables
        const {title, body} = this.state;
        // Random user to create the post;
        const randomId = Number(Math.floor(Math.random()*4)+1);
        console.log(randomId);
        // Send the post request to the posts server endpoint with the body and title as the body content
        return axios.post(`${appUrl}/posts`, {
            title,
            body,
            userId: randomId
        }).then(function (response) {
            // Save the response for debugging
            console.log('reponse from add post is ', JSON.stringify(response));
        }).then(res => {
            // fetch the new data by setting reloadRequired
            localStorage.setItem('reloadRequired', 'true')
            fetchNewData(this.props.context);
            document.querySelector('.NewPostForm').reset();
        })
    }

    render() {
        return (
            // The html representing the new form where when the title input or body input is changed or if the story is submitted the neccessary methods are called
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

export default PostForm

