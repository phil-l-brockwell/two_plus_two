import React from "react";
import { Link } from "react-router-dom";
import Avatar from "images/avatar.png";
import SignOutButton from "./SignOutButton";
import Form from "./Form";

const postFields = [{ name: "title" }, { name: "subtitle" }, { name: "text", type: "textarea" }];
const userFields = [{ name: "email" }, { name: "password", type: "password" }];

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showPostForm: false,
      showLoginForm: false
    };
  }

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
          {this.props.currentUser ? (
            <React.Fragment>
              <button onClick={this.togglePostForm.bind(this)}>post</button>
              <SignOutButton
                csrfToken={this.props.csrfToken}
                updateCsrfToken={this.props.updateCsrfToken}
                getCurrentUser={this.props.getCurrentUser}
              />
            </React.Fragment>
          ) : (
            <button className="button" onClick={this.toggleLoginForm.bind(this)}>
              log in
            </button>
          )}
        </div>
        {this.state.showLoginForm ? (
          <Form
            authenticityToken={this.props.csrfToken}
            updateCsrfToken={this.props.updateCsrfToken}
            callback={this.props.getCurrentUser}
            toggle={this.toggleLoginForm.bind(this)}
            url="/users/sign_in.json"
            resource="user"
            fields={userFields}
          />
        ) : null}
        {this.state.showPostForm ? (
          <Form
            callback={this.props.fetchPosts}
            toggle={this.togglePostForm.bind(this)}
            url="/api/posts"
            resource="post"
            fields={postFields}
          />
        ) : null}
      </header>
    );
  }

  togglePostForm() {
    this.setState({ showPostForm: !this.state.showPostForm });
  }

  toggleLoginForm() {
    this.setState({ showLoginForm: !this.state.showLoginForm });
  }
}

export default Header;
