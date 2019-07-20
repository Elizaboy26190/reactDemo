import React, { Component } from 'react'
import {Link} from "react-router-dom";

class Post extends Component {
    state = {
        id: null
    }
    componentDidMount(){
        console.loinst
        let id = this.props.match.params.post_id;
        this.setState({
            id
        })
    }
    render() {
        return (
            <div className="container">
                <h4>{this.state.id}</h4>
            </div>
        )
    }
}

export default Post



// import React from 'react';
// class PostList extends Component {
//     state = {
//         posts: [],
//         users: [],
//         isUpdatingPosts: true,
//         isUpdatingUsers: true
//         // loading: false
//     }
// componentDidMount() {
//     state = {
//         // posts: [],
//         user: [],
//         // isUpdatingPosts: true,
//         isUpdatingUser: true
//         // loading: false
//     }
// }
//
// // function Post(props) {
//     // console.log(props.match.params);
//     // console.log(this.props.match.params);
//     // console.log(props);
//
//
//     return (
//         <div className="Post" key={`${props.id}`}>
//             <div className="Post-title"><Link to={`/posts/${props.id}`}>{props.title}</Link></div>
//             <div className="Post-description"><p dangerouslySetInnerHTML={{__html: props.body}}/></div>
//             <div className="Post-author">
//                 <div className="ProfilePhoto">
//                     {/*<img src={`${Object.values(this.state.users[0])[3]}`} alt="." />*/}
//                 </div>
//                 <div className="Post-author-name">
//                     <small>posted by:</small>
//                     Mary Shelly
//                 </div>
//             </div>
//         </div>
//     );
// }
//
//
// export default Post;
//
//
//
//
//
//
//

//
//
// //Generates the required posts from the api
// import React, {Component} from 'react'
// import {getPosts,getUsers} from './getData'
// import {Link} from "react-router-dom";
// import axios from 'axios';
// // import Post from '../components/Post';
//
// class Post extends Component {
//     // local state to store local posts
//     state = {
//         // posts: [],
//         users: [],
//         isUpdatingPosts: true,
//         isUpdatingUsers: true
//         // loading: false
//     }
//
//     componentDidMount() {
//         console.log("props = "+this.props);
//
//         // axios.get(`${getPosts}`)
//         //     .then(res => {
//         //
//         //         // console.log("res =  "+res.json());
//         //         // console.log("data =  "+res.data.json());
//         //         return res.data;
//         //     })
//         //     .then(posts =>  {
//         //         this.setState({  posts });
//         //         this.setState({isUpdatingPosts:false});
//         //
//         //     })
//
//         axios.get(`${getUsers}`)
//             .then(res => {
//                 const  users = res.data;
//                 this.setState({  users });
//                 this.setState({isUpdatingUsers:false});
//
//             })
//
//     }
//
//     render() {
//         console.log("p = "+this.state.isUpdatingPosts+", u = "+this.state.isUpdatingUsers);
//
//         // make sure we have finished updating our posts and users
//         if (this.state.isUpdatingPosts ||this.state.isUpdatingUsers) return null;
//
//         let currentComponent = this;
//         //
//         //
//         console.log("posts = "+this.state.posts);
//         console.log("users = "+this.state.users);
//
//         // this.state.users.map(a=> console.log("img = "+a.photo_url));
//         let listposts = this.state.posts.map((post, index) => {
//             // {{
//             //     pathname: `/blog/${props.path}`,
//             //         state: { props }
//             // }}
//             return(
//                 /* <div className="Post" key={index}>
//                      <div className="Post-title"><Link to={`/posts/${post.id}`}>{post.title}</Link></div>
//                      <div className="Post-description"><p dangerouslySetInnerHTML={{__html: post.body}}/></div>
//                      <div className="Post-author">
//                          <div className="ProfilePhoto">
//                              <img src={`${Object.values(this.state.users[0])[3]}`} alt="." />
//                          </div>
//                          <div className="Post-author-name">
//                              <small>posted by:</small>
//                              Mary Shelly
//                          </div>
//                      </div>
//                  </div>*/
//                 // console.log(<Post {...post} key={post.ID} />);
//
//
//                 <Post {...post} key={post.ID} />
//             )
//         })
//
//         return (
//             <div className="PostList">
//                 {listposts}
//             </div>
//         );
//     }
// }
//
// export default Post;
//
//


