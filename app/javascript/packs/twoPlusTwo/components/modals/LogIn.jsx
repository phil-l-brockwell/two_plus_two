import React from "react";
import axios from "axios";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      style: { display: "none" }
    };
  }

  handleLogin(e) {
    e.preventDefault();
    const that = this;

    axios
      .post("/users/sign_in.json", this._payload())
      .then(function(response) {
        that.hide();
        that.props.getCurrentUser();
        that.props.updateCsrfToken(response.data["authenticity_token"]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  _payload() {
    return {
      user: {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      },
      authenticity_token: this.props.csrfToken
    };
  }

  render() {
    return (
      <div className="login-form" style={this.state.style}>
        <h2>Log in</h2>
        <button onClick={this.hide.bind(this)}>Close</button>
        <form>
          <input id="email" placeholder="email" />
          <input id="password" placeholder="password" type="password" />
          <button onClick={this.handleLogin.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }

  show() {
    this.setState({ style: { display: "block" } });
  }

  hide() {
    this.setState({ style: { display: "none" } });
  }
}

export default LogIn;
