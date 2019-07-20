import React, {Component} from 'react'
import AddPost from './AddPost'
import {Link} from "react-router-dom";
import {fetchNewData} from "./getData";

class Home extends Component {
    // Local state variables required
    state = {
        posts: [],
        users: [],
        categories: []
    }

    // When the component gets mounted we fetch new data if needed or pull from localStorage if required
    componentDidMount() {
        fetchNewData(this);
    }

    // HTML to renderr
    render() {
        // Local variables for us to use
        const {posts} = this.state
        const {users} = this.state
        const {categories} = this.state

        // We haven't finished returning the data yet so provide a useful message
        if (!posts || !users.length) return <div className="center">Loading posts...</div>;

        // List of HTML elements for us to show
        const postList = (
            // go through the list of props from our state
            posts.map(post => {
                // The user and the picture for the user
                let user = `${users[post.userId - 1].name}`;
                let user_pic = `${users[post.userId - 1].photo_url}`;

                // Iterate through the body to produce a new paragraph element per newline character
                const body = post.body.split('\n').map((paragraph, i) => {
                    return <p key={i}>{paragraph}</p>
                });
                // Use the CSS to help style our html and fill in dynamically from the information for the data
                return (
                    <div className="Post" key={`${post.id}`}>
                        <div className="Post-title"><Link to={`/posts/${post.id}`}>{post.title}</Link></div>
                        <div className="Post-description">
                            {body}
                        </div>
                        <div className="Post-author">
                            <div className="ProfilePhoto">
                                <img src={user_pic} alt="."/>
                            </div>
                            <div className="Post-author-name">
                                <small>posted by:</small>
                                {user}
                            </div>
                        </div>
                    </div>
                )
            })
        );

        // Create variables for the categories and their corresponding counts
        let keys = Object.keys((categories));
        let values = Object.values((categories));

        // Create the HTML needed for the category to render later
        const categoriesHTML = (categories) ? (
            keys.map((category, i) => {
                return (
                    <div className="Category" key={i}>
                        <span className="Category-count">{values[i]}</span>
                        <span className="Category-name">{category}</span>
                    </div>
                )
            })
        ) : (
            <div className="center">Loading categories...</div>
        );
        // Render the HTML
        return (
            <div>
                <div className="HomePage">
                    {/* AddPost Form (for creating new posts) */}
                    <AddPost/>
                    {/*Render the HTML for the categories*/}
                    <div className="CategoryList">
                        {categoriesHTML}
                    </div>
                    {/*Render the HTML for the posts*/}
                    <div className="PostList">
                        {postList}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home