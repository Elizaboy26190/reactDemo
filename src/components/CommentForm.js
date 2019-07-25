import React, {Component} from 'react'
import axios from 'axios'
import {appUrl, fetchNewData} from "./DataFunctions";

// Component to render the form to create new posts.
class CommentForm extends Component {

    // Set up the constructor in order to bind the necessary events and update the page if needed.
    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.state = {
            body: '',
            // posts: []
        };
    }

    // Function to handle setting the value for the body within our state
    handleBodyChange(e) {
        this.setState({body: e.target.value})
    }

    // Function to handle the form submission.
    addComment(event) {
        // Prevent the frame from reloading before the response is done to refresh the page.
        event.preventDefault();
        // Access our local state variables
        const {body} = this.state;

        // Send the post request to the comments server endpoint with the body and postId as the body content. We need to ensure postId is of a numeric type.
        axios.post(`${appUrl}/comments`, {
            body,
            postId: Number(this.props.id),
            userId: Number(Math.floor(Math.random()*4)+1)
        })
            .then(function (response) {
            // Save the response for debugging
            console.log('reponse from add comment is ', response);
        }).then(res => {console.log(this.props);
            // fetch the new data by setting reloadRequired
            localStorage.setItem('reloadRequired', 'true')
            fetchNewData(this.props.context);
            document.querySelector('.NewPostForm').reset();
        })
    }

    render() {
        return (
            // The html representing the new form where when the body input is changed or if the story is submitted the neccessary methods are called
            <form className="NewPostForm">
                <textarea
                    className="NewPostForm-body"
                    name="body"
                    cols="30"
                    rows="4"
                    placeholder="content"
                    onChange={this.handleBodyChange}
                />
                <div className="NewPostForm-actions">
                    <button className="Button" onClick={this.addComment}>Add Comment</button>
                </div>
            </form>
        )
    }
}

export default CommentForm

