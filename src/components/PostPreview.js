import React, { Component } from "react";
import {Link} from "react-router-dom";

// This class displays the content of the post we want to show and the user we need to display with
export default class PostPreview extends Component {


  render() {
      // The post we wish to display
      const post = this.props.post;

      // The user who authored the post
      let user = `${this.props.user.name}`;
      // The profile picture for the user
      let userPic = `${this.props.user.photo_url}`;

      // The body content of the post where each paragraph is in its own seperate element
      const body = post.body.split('\n').map((paragraph, i) => {
          return <p key={i}>{paragraph}</p>
      });

      // The html content we wish to display by using the post and user above
      const post_html = (
          <div className="Post" key={`${post.id}`}>
              <div className="Post-title"><Link to={`/posts/${post.id}`}>{post.title}</Link></div>
              <div className="Post-description">
                  {body}
              </div>
              <div className="Post-author">
                  <div className="ProfilePhoto">
                      <img src={userPic} alt="."/>
                  </div>
                  <div className="Post-author-name">
                      <small>posted by:</small>
                      {user}
                  </div>
              </div>
          </div>
      );

      // Return the content only if we have a post ready
      return (
          <div>
          {post && post_html}
          </div>
      );

  }
}
