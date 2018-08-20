import React from "react";
import { Link } from "react-router-dom";
import Avatar from "images/avatar.png";
import SignOutButton from "./SignOutButton";
import SignInForm from "./SignInForm";
import { CurrentUserConsumer } from "../../CurrentUser";

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showLoginForm: false
    };
    this.toggleLoginForm = this.toggleLoginForm.bind(this);
  }

  render() {
    return (
      <CurrentUserConsumer>
        {context => {
          const { user } = context.state;
          const { updateCurrentUser } = context.actions;

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
                {user ? (
                  <SignOutButton updateCurrentUser={updateCurrentUser} />
                ) : (
                  <button className="button" onClick={this.toggleLoginForm}>
                    log in
                  </button>
                )}
              </div>
              {this.state.showLoginForm ? (
                <SignInForm
                  updateCurrentUser={updateCurrentUser}
                  toggle={this.toggleLoginForm}
                />
              ) : null}
            </header>
          );
        }}
      </CurrentUserConsumer>
    );
  }

  toggleLoginForm() {
    this.setState(prevState => ({ showLoginForm: !prevState.showLoginForm }));
  }
}
