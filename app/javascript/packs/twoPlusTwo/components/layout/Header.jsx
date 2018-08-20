import React from "react";
import { Link } from "react-router-dom";
import Avatar from "images/avatar.png";
import SignOutButton from "./SignOutButton";
import Form from "./Form";
import { CurrentUserConsumer } from "../../CurrentUser";

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showLoginForm: false
    };
    this.toggleLoginForm = this.toggleLoginForm.bind(this);
    this.userFields = [
      { name: "email" },
      { name: "password", type: "password" }
    ];
  }

  render() {
    return (
      <CurrentUserConsumer>
        {context => {
          const { user } = context.state;
          const { updateCurrentUser, removeCurrentUser } = context.actions;

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
                  <SignOutButton callback={removeCurrentUser} />
                ) : (
                  <button className="button" onClick={this.toggleLoginForm}>
                    log in
                  </button>
                )}
              </div>
              {this.state.showLoginForm ? (
                <Form
                  callback={updateCurrentUser}
                  toggle={this.toggleLoginForm}
                  url="/users/sign_in.json"
                  resource="user"
                  fields={this.userFields}
                />
              ) : null}
            </header>
          );
        }}
      </CurrentUserConsumer>
    );
  }

  toggleLoginForm() {
    this.setState({ showLoginForm: !this.state.showLoginForm });
  }
}
