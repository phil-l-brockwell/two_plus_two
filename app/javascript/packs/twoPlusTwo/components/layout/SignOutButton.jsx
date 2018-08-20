import React from "react";
import axios from "axios";

export default class SignOutButton extends React.Component {
  handleLogout(e) {
    e.preventDefault();
    const data = this.payload();
    const that = this;

    axios
      .delete("/users/sign_out.json", { data })
      .then(function(response) {
        that.props.callback();
        document.querySelector('meta[name="csrf-token"]').content = response.data["authenticity_token"];
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  payload() {
    return {
      authenticity_token: document.querySelector('meta[name="csrf-token"]').content
    };
  }

  render() {
    return <button onClick={this.handleLogout.bind(this)}>sign out</button>;
  }
}
