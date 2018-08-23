import React from "react";

export default class SignOutButton extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { updateCurrentUser } = this.props;

    fetch("/users/sign_out.json", this.payload())
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(response => {
        const token = response.authenticity_token;
        if (token) {
          document.querySelector('meta[name="csrf-token"]').content = token;
        }
        updateCurrentUser(response.user);
      })
      .catch(response => {
        console.log(response);
      });
  }

  payload() {
    return {
      method: "DELETE",
      body: JSON.stringify({
        authenticity_token: document.querySelector('meta[name="csrf-token')
          .content
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
  }

  render() {
    return <button onClick={this.handleLogout}>sign out</button>;
  }
}
