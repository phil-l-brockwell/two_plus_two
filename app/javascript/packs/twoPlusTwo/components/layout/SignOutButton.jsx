import React from "react";
import axios from "axios";

export default class SignOutButton extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const data = {
      authenticity_token: document.querySelector('meta[name="csrf-token"]')
        .content
    };
    const { updateCurrentUser } = this.props;

    axios
      .delete("/users/sign_out.json", { data })
      .then(response => {
        updateCurrentUser();
        const token = response.data["authenticity_token"];
        if (token) {
          document.querySelector('meta[name="csrf-token"]').content = token;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <button onClick={this.handleLogout}>sign out</button>;
  }
}
