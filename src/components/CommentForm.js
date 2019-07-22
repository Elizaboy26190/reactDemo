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
        console.log(this.props)
        this.setState({body: e.target.value})
    }

    // Function to handle the form submission.
    addComment(event) {
        let currentState = this;
        // Prevent the frame from reloading before the response is done to refresh the page.
        event.preventDefault();
        const post = this.props.post;
        // const posts = this.state.posts;
        const id = this.props.id;
        let new_comment_id = 0;
        let post_response_data = "";
        // Access our local state variables
        const {body} = this.state;

        // Send the post request to the comments server endpoint with the body and postId as the body content. We need to ensure postId is of a numeric type.
        axios.post(`${appUrl}/comments`, {
            body,
            postId: Number(this.props.id),
            userId: 1
        })
            .then(function (response) {
            // Save the response for debugging
            console.log('reponse from add comment is ', response);
        }).then(res => {
            // fetch the new data
            fetchNewData(currentState);
        }).then(res => {
            // Indicate that we need to reload the page and fetch the new data
            localStorage.setItem('reloadRequired', true);

            // Refresh the page to trigger us to download the new post list
            window.location.reload()
        })

        // async function updatePost() {
        //     let response = await comment_update;
        //
        //     console.log("response is ",post_response_data);
        //     let comments = post.comments;
        //     console.log(post.comments);
        //     comments.push({
        //         "userId": 1,
        //         "postId": id,
        //         "body": body,
        //         "id": post_response_data.id
        //     })
        //     console.log(comments);
        //     axios.patch(`${appUrl}/posts/${id}`, {
        //         "comments":comments
        //     }).then(function (response) {
        //             // Save the response for debugging
        //             console.log('reponse from add comment is ', response);
        //         }).then(res => {
        //             // fetch the new data
        //             fetchNewData(currentState);
        //         }).then(res => {
        //             // Indicate that we need to reload the page and fetch the new data
        //             localStorage.setItem('reloadRequired', true);
        //
        //             // Refresh the page to trigger us to download the new post list
        //             window.location.reload()
        //         })
        // }
        // updatePost().then(res=>{console.log("successfully done both posts")}).catch(err=> console.log("failed to update posts"));


        //     .then(function (response) {
        //     // Save the response for debugging
        //     console.log('reponse from add comment to post sis ', response);
        // }).then(res => {
        //     // fetch the new data
        //     fetchNewData(this);
        // }).then(res => {
        //     // Indicate that we need to reload the page and fetch the new data
        //     localStorage.setItem('reloadRequired', true);
        //
        //     // Refresh the page to trigger us to download the new post list
        //     window.location.reload()
        // })
        //
        // let comment_update2 = {
        //     "userId": 1,
        //     "postId": this.props.id,
        //     "body": body,
        //     "id": 5
        // }
        //
        // // comments
        // let post_update = axios.patch(`${appUrl}/posts/${this.props.id}`, {
        //     body,
        //     postId: this.props.id,
        //     userId: 1
        // }).then(function (response) {
        //     // Save the response for debugging
        //     console.log('reponse from add comment is ', response);
        // }).then(res => {
        //     // fetch the new data
        //     fetchNewData(this);
        // }).then(res => {
        //     // Indicate that we need to reload the page and fetch the new data
        //     localStorage.setItem('reloadRequired', true);
        //
        //     // Refresh the page to trigger us to download the new post list
        //     window.location.reload()
        // })

        //also need to update posts
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
                    <button className="Button" onClick={this.addComment}>Add Story</button>
                </div>
            </form>
        )
    }
}

export default CommentForm

