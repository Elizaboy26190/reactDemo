import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Home from './components/Home'
import Post from './components/Post'

// The app element which will render the rest of the application
const App = () => (
    <Router>
        <div className="Page">
            <div className="Masthead">
                <h1 className="Masthead-title">
                    <Link to="/">
                        A simple micro-blog
                        <small className="Masthead-est">est. 1691</small>
                    </Link>
                </h1>
                <small><a href="https://github.com/Elizaboy26190/reactDemo">Written by Elizabeth Phillips with code available here</a>
                </small>
            </div>
            <Route exact path="/" component={Home}/>
            <Route path="/posts/:id" component={Post}/>

        </div>
    </Router>
);

export default App;