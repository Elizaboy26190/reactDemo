import React, {Component} from 'react'
import PostForm from './PostForm'
import {fetchNewData} from "./DataFunctions";
import PostPreview from "./PostPreview";
import Pagination from "./Pagination";

class Home extends Component {
    // Local state variables required
    state = {
        pageOfItems: []
    }

    constructor() {
        super();

        // an example array of 150 items to be paged


        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }


        // When the component gets mounted we fetch new data if needed or pull from localStorage if required
    componentDidMount() {
        const context = this;
        fetchNewData(context);

    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        console.log("change page to ",pageOfItems);
        console.log(this.state.pageOfItems);
        this.setState({ pageOfItems: pageOfItems });
        console.log(this.state);

        // console.log("change page to ",pageOfItems);

    }
    // HTML to render
    render() {
        // Local variables for us to use
        const {posts} = this.state;
        const {users} = this.state
        const {categories} = this.state
        const {filteredPosts} = this.state
        console.log("change page to ",this.state.pageOfItems);


        // We haven't finished returning the data yet so provide a useful message
        if (!posts || !users || !filteredPosts ||!categories) return <div className="center">Loading posts...</div>;

        // Create variables for the categories and their corresponding counts
        let keys = Object.keys((categories));
        let values = Object.values((categories));

        const context = this;
        // Function to filter the posts, the postFilter event is triggered on the clicking of the word category.
        const filterPosts = (postFilter) => {

            // Start by using the old original list
            let filteredPosts = posts;

            // If the category is anything other than all we need to filter
            if (!(postFilter.target.innerText === "all")) {
                filteredPosts = posts.filter((post) => {
                    return (post.categories.indexOf(postFilter.target.innerText) > -1)
                })
            }

            // Set the filteredPosts
            context.setState({
                filteredPosts
            })

        }
        // Create the HTML needed for the category to render later
        const categoriesHTML = (categories) ? (
            keys.map((category, i) => {
                return (
                    <div className="Category" key={i} onClick={filterPosts}>
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
                    <PostForm context={this}/>
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
                        {this.state.pageOfItems.map(post => <PostPreview post={post} user={users[post.userId - 1]}
                                                                 key={post.id}/>)}
                    </div>
                    <Pagination items={this.state.filteredPosts} context={this} onChangePage={this.onChangePage}/>
                </div>

            </div>
        )
    }
}

export default Home