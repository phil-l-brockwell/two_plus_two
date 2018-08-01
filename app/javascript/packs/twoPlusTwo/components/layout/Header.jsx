import React from "react";
import { Link } from "react-router-dom";
import Avatar from "images/avatar.png";
import SignOut from "../modals/SignOut";
import LogIn from "../modals/LogIn";

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
            Blog
          </Link>
          {this.userLink()}
        </div>
        <LogIn
          csrfToken={this.props.csrfToken}
          updateCsrfToken={this.props.updateCsrfToken}
          getCurrentUser={this.props.getCurrentUser}
          ref={instance => {
            this.logIn = instance;
          }}
        />
      </header>
    );
  }

  userLink() {
    if (this.props.currentUser) {
      return (
        <SignOut
          csrfToken={this.props.csrfToken}
          updateCsrfToken={this.props.updateCsrfToken}
          getCurrentUser={this.props.getCurrentUser}
        />
      );
    } else {
      return (
        <button
          className="button"
          onClick={() => {
            this.logIn.show();
          }}
        >
          Log in
        </button>
      );
    }
  }
}

export default Header;
