import React from "react";
import axios from "axios";

class SignOutButton extends React.Component {
  handleLogout(e) {
    e.preventDefault();
    const data = this.payload();
    const that = this;

    axios
      .delete("/users/sign_out.json", { data })
      .then(function(response) {
        that.props.callback();
        that.props.updateAuthenticationToken(response.data["authenticity_token"])
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  payload() {
    return {
      authenticity_token: this.props.authenticationToken
    };
  }

  render() {
    return <button onClick={this.handleLogout.bind(this)}>sign out</button>;
  }
}

export default SignOutButton;
