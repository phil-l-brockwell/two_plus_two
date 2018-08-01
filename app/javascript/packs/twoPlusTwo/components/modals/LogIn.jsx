import React from "react";
import axios from "axios";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      style: { display: "none" },
      errorMessage: ""
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
        that.setState({ errorMessage: "Incorrect username or password!" });
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
      <div className="modal" style={this.state.style}>
        <form>
          <i
            className="fa fa-close"
            aria-hidden="true"
            onClick={this.hide.bind(this)}
          />
          <input id="email" placeholder="enter email..." type="text" />
          <input
            id="password"
            placeholder="enter password..."
            type="password"
          />
          <input
            onClick={this.handleLogin.bind(this)}
            value="Log in"
            type="submit"
          />
          <p>{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }

  show() {
    this.setState({ style: { display: "block" } });
  }

  hide(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({ style: { display: "none" }, errorMessage: "" });
  }
}

export default LogIn;
