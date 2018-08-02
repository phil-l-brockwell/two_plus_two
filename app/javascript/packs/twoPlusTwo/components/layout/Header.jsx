import React from "react";
import { Link } from "react-router-dom";
import Avatar from "images/avatar.png";
import SignOut from "../modals/SignOut";
import LogIn from "../modals/LogIn";
import PostForm from "../modals/PostForm";

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/" className="avatar">
          <img src={Avatar} />
        </Link>
        <a
          href="mailto:phil.l.brockwell@gmail.com"
          className="email-link left button"
        >
          <span>@</span>
          <span className="mobile-hide">phil_brockwell</span>
        </a>
        <div className="header-links">
          <Link to="/posts" className="button">
            blog
          </Link>
          {this.userLinks()}
        </div>
        <LogIn
          csrfToken={this.props.csrfToken}
          updateCsrfToken={this.props.updateCsrfToken}
          getCurrentUser={this.props.getCurrentUser}
          ref={instance => {
            this.logIn = instance;
          }}
        />
        <PostForm
          ref={instance => {
            this.postForm = instance;
          }}
          fetchPosts={this.props.fetchPosts}
        />
      </header>
    );
  }

  userLinks() {
    if (this.props.currentUser) {
      return (
        <React.Fragment>
          <button
            onClick={() => {
              this.postForm.show();
            }}
          >
            post
          </button>
          <SignOut
            csrfToken={this.props.csrfToken}
            updateCsrfToken={this.props.updateCsrfToken}
            getCurrentUser={this.props.getCurrentUser}
          />
        </React.Fragment>
      );
    } else {
      return (
        <button
          className="button"
          onClick={() => {
            this.logIn.show();
          }}
        >
          log in
        </button>
      );
    }
  }
}

export default Header;
