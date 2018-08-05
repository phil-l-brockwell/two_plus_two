import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "images/avatar.png";
import SignOutButton from "./SignOutButton";
import Form from "./Form";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showLoginForm: false
    };
    this.toggleLoginForm = this.toggleLoginForm.bind(this);
    this.userFields = [{ name: "email" }, { name: "password", type: "password" }];
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
            <SignOutButton
              authenticationToken={this.props.authenticationToken}
              updateAuthenticationToken={this.props.updateAuthenticationToken}
              callback={this.props.removeCurrentUser}
            />
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
            fields={this.userFields}
          />
        ) : null}
      </header>
    );
  }

  toggleLoginForm() {
    this.setState({ showLoginForm: !this.state.showLoginForm });
  }
}

Header.proptypes = {
  currentUser: PropTypes.object,
  authenticationToken: PropTypes.string.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  updateAuthenticationToken: PropTypes.func.isRequired,
  removeCurrentUser: PropTypes.func.isRequired
}

export default Header;
