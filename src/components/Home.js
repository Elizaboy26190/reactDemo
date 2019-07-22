import React, {Component} from 'react'
import PostForm from './PostForm'
import {fetchNewData} from "./DataFunctions";
import PostPreview from "./PostPreview";

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

    // HTML to render
    render() {
        // Local variables for us to use
        const {posts} = this.state
        const {users} = this.state
        const {categories} = this.state

        // We haven't finished returning the data yet so provide a useful message
        if (!posts || !users.length) return <div className="center">Loading posts...</div>;

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
                    <PostForm/>
                    {/*Render the HTML for the categories*/}
                    <div className="CategoryList">
                        {categoriesHTML}
                    </div>
                    {/*Render the HTML for the posts*/}
                    <div className="PostList">
                        {this.state.posts.map(post => <PostPreview post={post} user={users[post.userId - 1]} comments={false} key={post.id}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home