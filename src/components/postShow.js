//Generates the required posts from the api
import React, {Component} from 'react'
import {getPosts,getUsers} from './getData'
import {Link} from "react-router-dom";
import axios from 'axios';


class PostShow extends Component {
    // local state to store local posts
    state = {
        posts: [],
        users: [],
        isUpdatingPosts: true,
        isUpdatingUsers: true
        // loading: false
    }

    componentDidMount() {

        // let postUrl = `${getPosts}`;
        // let usersUrl = `${getUsers}`;
        // let currentComponent = this;
        // // async function setup_posts() {
        //     fetch(postUrl)
        //         .then(data => data.json())
        //         .then(data => {
        //             console.log(data);
        //             console.log(postUrl);
        //             currentComponent.setState({
        //                 posts: data
        //             })
        //         })
        //     fetch(usersUrl)
        //         .then(data => data.json())
        //         .then(data => {
        //             console.log(data);
        //             console.log(usersUrl);
        //             currentComponent.setState({
        //                 users: data
        //             });
        //             // loading: false;
        //         });
        //
        //
        // // }
        // // setup_posts();
        // console.log("setup");

        // axios.get(`${getPosts}`)
        //     .then(res => {
        //         const  posts = res.data;
        //         this.setState({  posts });
        //     })

        axios.get(`${getPosts}`)
            .then(res => {

                // console.log("res =  "+res.json());
                // console.log("data =  "+res.data.json());
                return res.data;
            })
            .then(posts =>  {
                this.setState({  posts });
                this.setState({isUpdatingPosts:false});

            })

        axios.get(`${getUsers}`)
            .then(res => {
                const  users = res.data;
                this.setState({  users });
                this.setState({isUpdatingUsers:false});

            })

    }

    render() {
        console.log("p = "+this.state.isUpdatingPosts+", u = "+this.state.isUpdatingUsers);

        // make sure we have finished updating our posts and users
        if (this.state.isUpdatingPosts ||this.state.isUpdatingUsers) return null;

        let currentComponent = this;
        //
        //
        // console.log("posts = "+this.state.posts);
        // console.log("users = "+this.state.users);

        // this.state.users.map(a=> console.log("img = "+a.photo_url));
        let listposts = this.state.posts.map((post, index) => {
            // {{
            //     pathname: `/blog/${props.path}`,
            //         state: { props }
            // }}
            return(
                <div className="Post" key={index}>
                    <div className="Post-title"><Link to={`/posts/${post.id}`}>{post.title}</Link></div>
                    {/*<div className="Post-title"><Link to={{*/}
                    {/*    pathname: `/blog/${props.path}`,*/}
                    {/*    state: { props }*/}
                    {/*}}>{post.title}</Link></div>*/}
                    <div className="Post-description"><p dangerouslySetInnerHTML={{__html: post.body}}/></div>
                    <div className="Post-author">
                        <div className="ProfilePhoto">
                            <img src={`${Object.values(this.state.users[0])[3]}`} alt="." />
                        </div>
                        <div className="Post-author-name">
                            <small>posted by:</small>
                            Mary Shelly
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="PostList">
                {listposts}
            </div>
        );
    }
}

export default PostShow;