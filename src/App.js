import React, { Component } from 'react';
import './App.css';

// import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Link} from 'react-router-dom'
import Home from './components/Home'
// import About from './components/About'
// import Contact from './components/Contact'
import Post from './components/Post'

// class App extends Component {
//   render() {
//     return (
//         <BrowserRouter>
//           <div className="App">
//             <Navbar />
//             <Route exact path='/' component={Home}/>
//             {/*<Route path='/about' component={About} />*/}
//             {/*<Route path='/contact' component={Contact} />*/}
//             <Route path='/:post_id' component={Post} />
//           </div>
//         </BrowserRouter>
//     );
//   }
// }

const App = () => (
  <Router >
    <div className="Page">
      <div className="Masthead">
        <h1 className="Masthead-title">
          <Link to="/">
            A simple micro-blog
            <small className="Masthead-est">est. 1691</small>
          </Link>
        </h1>
      </div>
      <Route exact path="/" component={Home} />
      <Route path="/posts/:id" component={Post} />

    </div>
  </Router>
);

export default App;



// import React from 'react';
// import './App.css';
// import PostList from './components/postList';
// import Post from './components/Post';
//
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//
// // ------------------------------------------------------------------------------------------------
// //  Root component (renders the router and the common page layout elements)
// // ------------------------------------------------------------------------------------------------
// const App = () => (
//   <Router>
//     <div className="Page">
//       <div className="Masthead">
//         <h1 className="Masthead-title">
//           <Link to="/">
//             A simple micro-blog
//             <small className="Masthead-est">est. 1691</small>
//           </Link>
//         </h1>
//       </div>
//       <Route exact path="/" component={HomePage} />
//       <Route path="/posts/:id" component={Post} />
//
//     </div>
//   </Router>
// );
//
// // ------------------------------------------------------------------------------------------------
// //  HomePage component
// // ------------------------------------------------------------------------------------------------
// const HomePage = () => (
//   <div className="HomePage">
//     {/* NewPostForm (for creating new posts) */}
//     <form action="#" className="NewPostForm">
//       <input
//         className="NewPostForm-title"
//         name="title"
//         type="text"
//         placeholder="title"
//       />
//       <textarea
//         className="NewPostForm-body"
//         name="body"
//         cols="30"
//         rows="4"
//         placeholder="content"
//       />
//       <div className="NewPostForm-actions">
//         <button className="Button">Add Story</button>
//       </div>
//     </form>
//
//     <div className="CategoryList">
//       <span className="CategoryList-header">Categories:</span>
//       <div className="Category">
//         <span className="Category-count">2</span>
//         <span className="Category-name">Science-fiction</span>
//       </div>
//       <div className="Category">
//         <span className="Category-count">1</span>
//         <span className="Category-name">Horror</span>
//       </div>
//       <div className="Category">
//         <span className="Category-count">2</span>
//         <span className="Category-name">History</span>
//       </div>
//       <div className="Category">
//         <span className="Category-count">1</span>
//         <span className="Category-name">Biography</span>
//       </div>
//       <div className="Category">
//         <span className="Category-count">1</span>
//         <span className="Category-name">Technology</span>
//       </div>
//     </div>
//     {/*<div className="App">*/}
//     {/*</div>*/}
//     <PostList/>
//
//     <div className="PostList">
//       {/* Post 1 */}
//       <div className="Post">
//         <div className="Post-title">
//           <Link to="/posts/1">A monster</Link>
//         </div>
//         <div className="Post-description">
//           <p>
//             At the same time, it is an early example of science fiction. Brian
//             Aldiss has argued that it should be considered the first true
//             science fiction story because, in contrast to previous stories with
//             fantastical elements resembling those of later science fiction, the
//             central character "makes a deliberate decision" and "turns to modern
//             experiments in the laboratory" to achieve fantastic results.[4] It
//             has had a considerable influence in literature and popular culture
//             and spawned a complete genre of horror stories, films and plays.
//           </p>
//           <p>
//             Speaking to Victor Frankenstein, the wretch refers to himself as
//             "the Adam of your labours", and elsewhere as someone who "would have
//             [been] your Adam", but is instead "your fallen angel" (which ties to
//             Lucifer in Paradise Lost, which the monster reads, and relates to
//             the "modern" Prometheus of the book's subtitle).
//           </p>
//         </div>
//         <div className="Post-author">
//           <div className="ProfilePhoto">
//             <img src="http://i.imgur.com/HjvWGnE.jpg" alt="" />
//           </div>
//           <div className="Post-author-name">
//             <small>posted by:</small>
//             Mary Shelly
//           </div>
//         </div>
//       </div>
//       {/* Post 2 */}
//       <div className="Post">
//         <div className="Post-title">
//           <Link to="/posts/2">Another Post</Link>
//         </div>
//         <div className="Post-description">
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             Pellentesque aliquam magna convallis, fringilla ante a, fringilla
//             lorem. Vivamus gravida varius suscipit. Curabitur in varius diam.
//             Nulla a eleifend sapien. Integer dignissim ullamcorper mi nec
//             consectetur.
//           </p>
//           <p>
//             Pellentesque molestie velit venenatis ligula congue, quis commodo
//             nibh ultrices. Nulla ut faucibus augue. Mauris lorem mauris, mattis
//             sagittis leo sed, porta posuere libero. Vivamus facilisis purus non
//             felis hendrerit pharetra. Aenean quis nunc tortor. Integer eu magna
//             ac mi viverra interdum. Cum sociis natoque penatibus et magnis dis
//             parturient montes, nascetur ridiculus mus. Nulla rutrum vehicula
//             ante.
//           </p>
//         </div>
//         <div className="Post-author">
//           <div className="ProfilePhoto">
//             <img src="http://i.imgur.com/BAXUBT4.jpg" alt="" />
//           </div>
//           <div className="Post-author-name">
//             <small>posted by:</small>
//             Cory Doctorow
//           </div>
//         </div>
//       </div>
//       {/* END .Post */}
//     </div>
//     {/* END .PostList */}
//   </div>
// ); /* END .PostPage */
//
// // ------------------------------------------------------------------------------------------------
// // PostPage (renders a single post and comments)
// // ------------------------------------------------------------------------------------------------
// const PostPage = () => (
//   <div className="PostPage">
//     {/*<PostInfo/>*/}
//   {/*<Post/>*/}
//     <div className="Post">
//       <div className="Post-title">
//         <Link to="/posts/1">A monster</Link>
//       </div>
//       <div className="Post-description">
//         <p>
//           At the same time, it is an early example of science fiction. Brian
//           Aldiss has argued that it should be considered the first true science
//           fiction story because, in contrast to previous stories with
//           fantastical elements resembling those of later science fiction, the
//           central character "makes a deliberate decision" and "turns to modern
//           experiments in the laboratory" to achieve fantastic results.[4] It has
//           had a considerable influence in literature and popular culture and
//           spawned a complete genre of horror stories, films and plays.
//         </p>
//         <p>
//           Speaking to Victor Frankenstein, the wretch refers to himself as "the
//           Adam of your labours", and elsewhere as someone who "would have [been]
//           your Adam", but is instead "your fallen angel" (which ties to Lucifer
//           in Paradise Lost, which the monster reads, and relates to the "modern"
//           Prometheus of the book's subtitle).
//         </p>
//       </div>
//       <div className="Post-author">
//         <div className="ProfilePhoto">
//           <img src="http://i.imgur.com/HjvWGnE.jpg" alt="" />
//         </div>
//         <div className="Post-author-name">
//           <small>posted by:</small>
//           Mary Shelly
//         </div>
//       </div>
//     </div>
//
//     <div className="Comments">
//       <h3>Comments</h3>
//       <div className="CommentsList">
//         {/* Comment 1 */}
//         <div className="Comment">
//           <div className="ProfilePhoto">
//             <img src="http://i.imgur.com/BAXUBT4.jpg" alt="" />
//           </div>
//           <div className="Comment-details">
//             <div className="Comment-authorName">Cory Doctorow</div>
//             <div className="Comment-text">This is a cool post</div>
//           </div>
//         </div>
//
//         {/* Comment 2 */}
//         <div className="Comment">
//           <div className="ProfilePhoto">
//             <img src="http://i.imgur.com/HjvWGnE.jpg" alt="" />
//           </div>
//           <div className="Comment-details">
//             <div className="Comment-authorName">Mary Shelly</div>
//             <div className="Comment-text">Thanks ;)</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
//
// export default App;
