import React, { Component } from 'react'
import axios from 'axios'
import AddPost from './AddPost'
import {Link} from "react-router-dom";


class Home extends Component {
    state = {
        posts:[]
        // user_comments:[],
    }

  componentDidMount(){
      //want both to run in parallel if user number is minimal
    axios.get('https://api-yelbdjwpjh.now.sh/posts/?_expand=user')
      .then(res => {
        // console.log(res);
          this.setState({posts: res.data});
      })

  }

  render(){

      const { posts } = this.state
      // const { users } = this.state
      // console.log("post = "+posts)

      // const Greeting = props => <h1>{props.id}</h1>;
      const postList = (posts.length)? (
      posts.map(post => {
          let user = `${post.user.name}`;
        return (
            <div className="Post" key={`${post.id}`}>
                <div className="Post-title"><Link to={`/posts/${post.id}`}>{post.title}</Link></div>
                <div className="Post-description"><p>{post.body}</p></div>
                <div className="Post-author">
                    <div className="ProfilePhoto">
                        <img src={`${post.user.photo_url}`} alt="." />
                    </div>
                    <div className="Post-author-name">
                        <small>posted by:</small>
                        {user}
                    </div>
                </div>
            </div>
        )
      })
    ) : (
      <div className="center">Loading posts...</div>
    );

    return (
        <div>
            <div className="HomePage">
                {/* NewPostForm (for creating new posts) */}
                <AddPost/>



                <div className="CategoryList">
                    <span className="CategoryList-header">Categories:</span>
                    <div className="Category">
                        <span className="Category-count">2</span>
                        <span className="Category-name">Science-fiction</span>
                    </div>
                    <div className="Category">
                        <span className="Category-count">1</span>
                        <span className="Category-name">Horror</span>
                    </div>
                    <div className="Category">
                        <span className="Category-count">2</span>
                        <span className="Category-name">History</span>
                    </div>
                    <div className="Category">
                        <span className="Category-count">1</span>
                        <span className="Category-name">Biography</span>
                    </div>
                    <div className="Category">
                        <span className="Category-count">1</span>
                        <span className="Category-name">Technology</span>
                    </div>
                </div>
            </div>

            <div className="PostList">
                {postList}
            </div>

      </div>
    )
  }
}

export default Home