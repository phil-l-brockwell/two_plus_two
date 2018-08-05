import React from "react";
import { Link } from "react-router-dom";
import Avatar from "images/avatar.png";
import SignOutButton from "./SignOutButton";
import Form from "./Form";

const userFields = [{ name: "email" }, { name: "password", type: "password" }];

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showLoginForm: false
    };
    this.toggleLoginForm = this.toggleLoginForm.bind(this);
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
              <button onClick={this.props.togglePostForm}>post</button>
              <SignOutButton
                authenticationToken={this.props.authenticationToken}
                updateAuthenticationToken={this.props.updateAuthenticationToken}
                callback={this.props.removeCurrentUser}
              />
            </React.Fragment>
          ) : (
            <button className="button" onClick={this.toggleLoginForm}>
              log in
            </button>
          )}
        </div>
        {this.state.showLoginForm ? (
          <Form
            authenticityToken={this.props.authenticationToken}
            updateAuthenticationToken={this.props.updateAuthenticationToken}
            callback={this.props.updateCurrentUser}
            toggle={this.toggleLoginForm}
            url="/users/sign_in.json"
            resource="user"
            fields={userFields}
          />
        ) : null}
      </header>
    );
  }

  toggleLoginForm() {
    this.setState({ showLoginForm: !this.state.showLoginForm });
  }
}

export default Header;
