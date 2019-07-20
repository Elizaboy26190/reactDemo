import React, { Component } from 'react'
import axios from 'axios'
import AddPost from './AddPost'
// import Categories from './Categories'
import {Link} from "react-router-dom";


class Home extends Component {
    state = {
        posts:[],
        users:[]
        // user_comments:[],
    }

  componentDidMount(){
        console.log(localStorage.getItem('reloadRequired')==='true');
        if(localStorage.getItem('reloadRequired')==='true'||!localStorage.getItem('posts')){
            console.log("need to save posts");
            axios.get('https://api-yelbdjwpjh.now.sh/posts/?_embed=comments')
                .then(res => {
                    const new_res_data = res.data.sort((a,b)=> a.createdAt<b.createdAt?1:-1);
                    this.setState({posts:new_res_data});
                    localStorage.setItem('posts',JSON.stringify(new_res_data))
                }).then(a=>{
                console.log("posts = "+this.state.posts);

            });

            axios.get('https://api-yelbdjwpjh.now.sh/users')
                .then(res => {
                    // console.log(res);
                    this.setState({users: res.data});
                    localStorage.setItem('users',JSON.stringify(res.data))
                }).then(a=>{
                console.log("users = "+this.state.users);

            });
            localStorage.setItem('reloadRequired',false);
        }
      else if(localStorage.getItem('posts')){
          console.log("posts exists");
          console.log(localStorage.getItem('posts'));
            this.setState({posts: JSON.parse(localStorage.getItem('posts'))});
            this.setState({users: JSON.parse(localStorage.getItem('users'))});

            console.log("posts = "+this.state.posts);
        }
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
      console.log(posts);
      console.log(users);
if(!posts.length||!users.length) return       <div className="center">Loading posts...</div>;

console.log("both ready");
      console.log(posts);
      console.log(users);

      const postList =(
      posts
          .map(post => {
              console.log(post.userId);
              console.log(this.state.users);
          let user = `${this.state.users[post.userId-1].name}`;
              let user_pic = `${this.state.users[post.userId-1].photo_url}`;

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
      const cats = [];
    const cat_array = posts.filter(a=>(a.categories.length!==0)).map(post=>{
        const a = [];
        a.push(...post.categories);
        console.log(cats);
        cats.push(...post.categories);
        return  post.categories});

      const reduced_data = cats.reduce((all_categories, category)=> {
          if (!all_categories[category]) {
              all_categories[category] = 0;
          }
          all_categories[category]++;
          return all_categories;
      }, {});
      console.log("cagts = "+cats.length);
let keys = Object.keys((reduced_data));
      let values = Object.values((reduced_data));

      const categories = (posts.length)? (
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
console.log("cagts = "+cats);
      console.log("cagts ARRAY  = "+cat_array);

      console.log("reduced = "+JSON.stringify(reduced_data));

    return (
        <div>
            <div className="HomePage">
                {/* NewPostForm (for creating new posts) */}
                <AddPost/>
                <div className="CategoryList">
                {categories}
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