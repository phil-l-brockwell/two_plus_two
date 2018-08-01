import React from "react";
import axios from "axios";

class SignOut extends React.Component {
  handleLogout(e) {
    e.preventDefault();
    const data = this._payload();
    const that = this;

    axios
      .delete("/users/sign_out.json", { data })
      .then(function(response) {
        that.props.getCurrentUser();
        that.props.updateCsrfToken(response.data["authenticity_token"])
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  _payload() {
    return {
      authenticity_token: this.props.csrfToken
    };
  }

  render() {
    return <button onClick={this.handleLogout.bind(this)}>Sign Out</button>;
  }
}

export default SignOut;
