// Default page to create access to posts from the appUrl endpoint

// import React, {Components} from 'react';

// Link to default URL for requests
import axios from "axios";

export const appUrl = "https://api-yelbdjwpjh.now.sh/";

// Posts API Request
export const getPosts = `${appUrl}posts`;
export const getUsers = `${appUrl}users`;

export function updateState(state) {
    if(localStorage.getItem('reloadRequired')==='true'||!localStorage.getItem('posts')){


    console.log("need to save posts");
    axios.get('https://api-yelbdjwpjh.now.sh/posts/?_embed=comments')
        .then(res => {
            const new_res_data = res.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
            state.setState({posts: new_res_data});
            localStorage.setItem('posts', JSON.stringify(new_res_data))
        }).then(a => {
        console.log("posts = " + state.state.posts);
        }).then(res => {
            //now need to get categories
        const cats = [];
        state.state.posts.filter(a => (a.categories.length !== 0)).map(post => {
            const a = [];
            a.push(...post.categories);
            console.log(cats);
            cats.push(...post.categories);
            return post.categories
        });

        const reduced_data = cats.reduce((all_categories, category) => {
            if (!all_categories[category]) {
                all_categories[category] = 0;
            }
            all_categories[category]++;
            return all_categories;
        }, {});
        console.log(reduced_data);
        state.setState({categories: reduced_data});
        localStorage.setItem('categories', JSON.stringify(reduced_data))
    });

    axios.get('https://api-yelbdjwpjh.now.sh/users')
        .then(res => {
            // console.log(res);
            state.setState({users: res.data});
            localStorage.setItem('users', JSON.stringify(res.data))
        }).then(a => {
        console.log("users = " + state.state.users);

    });
    localStorage.setItem('reloadRequired', false);
    }
    else if(localStorage.getItem('posts')){
        console.log("posts exists");
        console.log(localStorage.getItem('posts'));
        state.setState({posts: JSON.parse(localStorage.getItem('posts'))});
        state.setState({users: JSON.parse(localStorage.getItem('users'))});
        state.setState({categories: JSON.parse(localStorage.getItem('categories'))});


        console.log("posts = "+state.state.posts);
    }
}