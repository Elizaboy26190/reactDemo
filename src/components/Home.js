import React, { Component } from 'react'
import axios from 'axios'
import AddPost from './AddPost'
// import Categories from './Categories'
import {Link} from "react-router-dom";
import {updateState} from "./getData";


class Home extends Component {
    state = {
        posts:[],
        users:[],
        categories:[]
        // user_comments:[],
    }

  componentDidMount(){
        console.log(localStorage.getItem('reloadRequired')==='true');
       updateState(this);
      //want both to run in parallel if user number is minimal

      //
      // if(!localStorage.getItem('users')){
      //     console.log("need to save users");
      //
      //
      // }
      // else if(localStorage.getItem('users')){
      //     console.log("users exists");
      //     console.log(localStorage.getItem('users'));
      //     console.log("users = "+this.state.users);
      // }

  }

  render(){
      const { posts } = this.state
      const { users } = this.state
      const {categories} = this.state
      console.log(posts);
      console.log(users);
if(!posts||!users.length) return       <div className="center">Loading posts...</div>;

console.log("both ready");
      console.log(posts);
      console.log(users);

      const postList =(
      posts
          .map(post => {
              console.log(post.userId);
              console.log(users);
          let user = `${users[post.userId-1].name}`;
              let user_pic = `${users[post.userId-1].photo_url}`;

              console.log("user = "+user);

              const body =  post.body.split('\n').map((paragraph,i) => {return <p key={i}>{paragraph}</p>});
              return (
            <div className="Post" key={`${post.id}`}>
                <div className="Post-title"><Link to={`/posts/${post.id}`}>{post.title}</Link></div>
                <div className="Post-description">
                    {body}
                </div>
                <div className="Post-author">
                    <div className="ProfilePhoto">
                        <img src={user_pic} alt="." />
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

      // console.log("cagts = "+cats.length);

      // console.log("reduced = "+JSON.stringify(reduced_data));
      // this.state.categories=reduced_data;
      console.log(categories);
let keys = Object.keys((categories));
      let values = Object.values((categories));

      const categoriesHTML = (posts.length)? (
          keys.map((category,i)=>{
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
console.log(this.state.categories);
      // console.log("cagts ARRAY  = "+cat_array);


    return (
        <div>
            <div className="HomePage">
                {/* NewPostForm (for creating new posts) */}
                <AddPost/>
                <div className="CategoryList">
                {categoriesHTML}
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