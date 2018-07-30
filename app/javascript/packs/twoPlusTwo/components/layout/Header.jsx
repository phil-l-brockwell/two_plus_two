import React from "react";
import { Link } from "react-router-dom";
import Avatar from 'images/avatar.png'

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/" className="avatar">
          <img src={Avatar} />
        </Link>
        <a href="mailto:phil.l.brockwell@gmail.com" className="email-link left button">
          <span>@</span>
          <span className='mobile-hide'>phil_brockwell</span>
        </a>
        <div className="header-links">
          <Link to="/posts" className="button">Blog</Link>
          {this.userLinks()}
        </div>
      </header>
    );
  }

  userLinks() {
    if (this.props.currentUser) {
      return (
        <Link to="/" className="button">Sign out</Link>
      )
    } else {
      return (
        <Link to="/" className="button">Login</Link>
      )
    }
  }
}

export default Header;
