import React, {Component} from 'react'
import PostForm from './PostForm'
import {fetchNewData} from "./DataFunctions";
import PostPreview from "./PostPreview";

class Home extends Component {
    // Local state variables required
    state = {
        posts: [],
        users: [],
        filteredPosts: [],
        categories: []
    }

    // When the component gets mounted we fetch new data if needed or pull from localStorage if required
    componentDidMount() {
        fetchNewData(this);
        // this.state.filteredPosts = this.state.posts;
    }

    // HTML to render
    render() {
        // Local variables for us to use
        const posts = JSON.parse(localStorage.getItem('posts'));
        const {users} = this.state
        const {categories} = this.state
        let {filteredPosts} = this.state
        console.log(posts);
        console.log(filteredPosts);

        // We haven't finished returning the data yet so provide a useful message
        if (!filteredPosts || !users.length) return <div className="center">Loading posts...</div>;
        // We need to set the initial filteredPosts once the posts are ready
        if(!filteredPosts.length ) {
            filteredPosts=posts;
            console.log()
        }
        // Create variables for the categories and their corresponding counts
        let keys = Object.keys((categories));
        let values = Object.values((categories));

        const context = this;
        // Function to filter the posts, the postFilter event is triggered on the clicking of the word category.
        const filterPosts = (postFilter) => {

            // Start by using the old original list
            let filteredPosts = posts;

            // If the category is anything other than all we need to filter
            if(!(postFilter.target.innerText==="all")) {
                filteredPosts = posts.filter((post) => {
                    console.log(post.categories.indexOf(postFilter.target.innerText));
                    return (post.categories.indexOf(postFilter.target.innerText)>-1)
                })
            }

            // Set the filteredPosts
            context.setState({
                filteredPosts
            })

            // fetchNewData(context);
        }
        // Create the HTML needed for the category to render later
        const categoriesHTML = (categories) ? (
            keys.map((category, i) => {
                return (
                    <div className="Category" key={i} onClick={filterPosts} >
                        <span className="Category-count">{values[i]}</span>
                        <span className="Category-name">{category}</span>
                    </div>
                )
            })
        ) : (
            <div className="center">Loading categories...</div>
        );
        // Render the HTML
        console.log(filteredPosts);
        return (
            <div>
                <div className="HomePage">
                    {/* AddPost Form (for creating new posts) */}
                    <PostForm/>
                    {/*Render the HTML for the categories*/}
                    <div className="CategoryList">
                        <div className="Category" key={-1} onClick={filterPosts}>
                            <span className="Category-count">{posts.length}</span>
                            <span className="Category-name">all</span>
                        </div>
                        {categoriesHTML}
                    </div>
                    {/*Render the HTML for the posts*/}
                    <div className="PostList">
                        {/*Work off the filteredPosts instead of the main Posts*/}
                        {filteredPosts.map(post => <PostPreview post={post} user={users[post.userId - 1]} comments={false} key={post.id}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home