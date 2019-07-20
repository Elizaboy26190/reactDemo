import React, { Component } from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'


class Post extends Component {
    state = {
        id: null,
        // user_comments:[],
    }

    componentDidMount(){
        console.log("props = "+this.props);
        let id = this.props.match.params.id;

        let stored_posts = JSON.parse(localStorage.getItem('posts'));
        let stored_users = JSON.parse(localStorage.getItem('users'));
        this.setState({id: id});

        if(localStorage.getItem('reloadRequired')==='true'||!localStorage.getItem('posts')){
            console.log("need to save posts");
            axios.get('https://api-yelbdjwpjh.now.sh/posts/?_embed=comments')
                .then(res => {
                    // console.log(res);
                    const res_data = res.data;
                    const new_res_data = res_data.sort((a,b)=> a.createdAt<b.createdAt?1:-1);
                    console.log(res_data);
                    console.log(new_res_data);
                    this.setState({posts: new_res_data});
                    localStorage.setItem('posts',JSON.stringify(new_res_data))
                    stored_posts = JSON.parse(localStorage.getItem('posts'))
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
            console.log("posts = "+this.state.posts);
            this.setState({users: JSON.parse(localStorage.getItem('users'))});

        }
        //want both to run in parallel if user number is minimal

        console.log(id);
// console.log(stored_posts[stored_posts.length-id]);
        console.log(stored_users);
//posts changed so we automat
//         if(!stored_users||stored_users.length<stored_posts[stored_posts.length-id].userId){
//             console.log("need to save users");
//
//
//         }
//         else if(localStorage.getItem('users')){
//             console.log("users exists");
//             console.log(localStorage.getItem('users'));
//             this.setState({users: JSON.parse(localStorage.getItem('users'))});
//             console.log("users = "+this.state.users);
//         }

        // // let it  = stored_posts.keys();
        // // console.log(`testing ${!stored_posts}`);
        // // console.log(`testing ${stored_posts.length} and ${id} to be ${stored_posts.length<=id} and `);
        // if(!stored_posts||stored_posts.length<id){
        //     //not got enough so need to redo our fetches
        //     // console.log(stored_posts.length-id);
        //     // console.log(stored_posts[stored_posts.length-id]);
        //     axios.get('https://api-yelbdjwpjh.now.sh/posts/' +'?_expand=user')
        //         .then(res => {
        //             this.setState({posts: res.data});
        //             localStorage.setItem('posts',JSON.stringify(res.data))
        //             stored_posts = JSON.parse(localStorage.getItem('posts'));
        //
        //             // this.setState({isUpdatingPosts: false});
        //         }).then(res=>{
        //         this.setState({'post_user': stored_posts[stored_posts.length-id]});
        //             console.log("news length = "+stored_posts.length);
        //         console.log("new local"+Object.keys(this.state.post_user));
        //     })
        //
        //     axios.get('https://api-yelbdjwpjh.now.sh/comments?postId='+id)
        //         .then(res => {
        //             this.setState({comments: res.data});
        //             localStorage.setItem('comments',JSON.stringify(res.data))
        //             // this.setState({isUpdatingPosts: false});
        //         })
        //         .then(res=> {
        //             console.log("com = "+this.state.comments);
        //             let responses = [];
        //             var promises = this.state.comments.map(comment =>
        //                 fetch('https://api-yelbdjwpjh.now.sh/users/'+comment.userId)
        //                     .then(res => res.json())
        //                     .catch(error => console.log('There was a problem!', error))
        //             )
        //             Promise.all(promises).then(results => {
        //                 console.log("res = "+Array.from(results));
        //                 this.setState({commentUsers: (results)});
        //             });
        //
        //         })
        // }
        //
        // else {
        //     //already have the info so read from local
        //     this.state.post_user = stored_posts[stored_posts.length-id];
        //
        //     console.log("already local"+Object.keys(this.state.post_user));
        // }
        //
        // //check users
        // let stored_users = JSON.parse(localStorage.getItem('users'));
        // if(!stored_users||stored_users.length<stored_posts[id].userId){
        //
        // }
        //
        // else {
        //
        // }
        //
        // //check comments
        //
        // if(true) {
        //
        // }
        //
        // else {
        //
        // }
        // // if(localStorage.getItem('posts')<id){
        // //     console.log("not saved and need to add");
        // //
        // //
        // // }
        // // else {
        // //     console.log("already saved all ");
        // // }
        // //     axios.get('https://api-yelbdjwpjh.now.sh/posts/' +id+'?_expand=user')
        // //     .then(res => {
        // //         this.setState({post_user: res.data});
        // //         // this.setState({isUpdatingPosts: false});
        // //     })
        //
        // // axios.get('https://api-yelbdjwpjh.now.sh/comments?postId='+id)
        // //     .then(res => {
        // //         this.setState({comments: res.data});
        // //         // this.setState({isUpdatingPosts: false});
        // //     })
        // //     .then(res=> {
        // //         console.log("com = "+this.state.comments);
        // //         let responses = [];
        // //         var promises = this.state.comments.map(comment =>
        // //             fetch('https://api-yelbdjwpjh.now.sh/users/'+comment.userId)
        // //                 .then(res => res.json())
        // //                 .catch(error => console.log('There was a problem!', error))
        // //         )
        // //
        // //         Promise.all(promises).then(results => {
        // //             console.log("res = "+Array.from(results));
        // //             this.setState({commentUsers: (results)});
        // //         });
        // //
        // //     })

    }
    render() {
        // console.log(this.state.post_user+","+this.state.comments+","+this.state.commentUsers);
        // console.log((this.user)?"user found":"waiting");
        // console.log("user = "+JSON.stringify(this.state.post.user));

        const { posts } = this.state
        const { users } = this.state
        const { id } = this.state

        if (!users||!posts){
        return <div className="center">Loading post...</div>;
        }
        const full_post = posts[posts.length - id];
        if(!full_post) {
            return <div className="center">Loading post full...</div>;
        }
        // console.log("post = "+JSON.stringify(this.state.post_user));
        // console.log("post = "+JSON.stringify(this.state.comments));
        // console.log("Users = "+JSON.stringify(this.state.commentUsers));
        console.log(id)
        const user = users[full_post.userId-1];
        console.log(user);
        const userName = (user)?user.name:"";
        console.log(userName);
        const body =  full_post.body.split('\n').map((paragraph,i) => {return <p key={i}>{paragraph}</p>});
        console.log("bod = "+body);
        const post = (full_post)?(
            <div className="Post" key={`${id}`}>
                <div className="Post-title"><Link to={`/posts/${id}`}>{full_post.title}</Link></div>
                <div className="Post-description">
                {body}
                </div>
                <div className="Post-author">
                    <div className="ProfilePhoto">
                        <img src={`${user.photo_url}`} alt="." />
                    </div>
                    <div className="Post-author-name">
                        <small>posted by:</small>
                        {userName}
                    </div>
                </div>
            </div>
        ):(<div className="center">Loading post2...</div>)
        const full_post_comments = full_post.comments;
        // console.log(full_post_comments[0].userId);

        const comments = (posts&&users)?full_post.comments.map((comment,i)=>{
            const com_user = full_post_comments[i].userId;
            console.log(com_user);
            const body = comment.body.split('/n').map((paragraph,i) => {return <div className="Comment-text" key={i}>{paragraph}</div>});
            console.log("body = "+body);
            return(
                <div className="Comment" key={`${comment.id}`}>
                    <div className="ProfilePhoto">
                        <img src={`${users[com_user-1].photo_url}`} alt="" />
                               </div>
                               <div className="Comment-details">
                                 <div className="Comment-authorName">{users[com_user-1].name}</div>
                                 {body}
                               </div>
                             </div>
            )
            }):(<div className="center">Loading comments...</div>);

        return (
            <div>
                {post}
                <div className="Comments">
                    <div className="CommentsList">
                    {comments}
                    </div>
                </div>
            </div>

        )
    }
}

export default Post