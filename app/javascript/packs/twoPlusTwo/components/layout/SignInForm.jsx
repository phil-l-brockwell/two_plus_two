import React from "react";
import Input from "./Input";
import axios from "axios";

export default class SignInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        email: "",
        password: ""
      },
      errorMessage: ""
    };
    this.fieldTypes = { email: "text", password: "password" };
    this.send = this.send.bind(this);
  }

  send(e) {
    e.preventDefault();
    const { updateCurrentUser, toggle } = this.props;

    axios
      .post("/users/sign_in.json", this.payload())
      .then(response => {
        const token = response.data["authenticity_token"];
        if (token) {
          document.querySelector('meta[name="csrf-token"]').content = token;
        }
        updateCurrentUser(response.data["user"]);
        toggle();
      })
      .catch(response => {
        that.setState({ errorMessage: "Something went wrong!" });
      });
  }

  render() {
    const fields = Object.keys(this.state.fields).map((field, i) => (
      <Input
        key={i}
        name={field}
        value={this.state.fields[field]}
        type={this.fieldTypes[field]}
        onChange={e => this.updateField(e)}
      />
    ));

    const { toggle } = this.props;

    return (
      <div className="modal">
        <form className="user-form">
          <i
            className="fa fa-close"
            aria-hidden="true"
            onClick={toggle}
          />
          {fields}
          <input onClick={this.send} type="submit" />
          <p>{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }

  payload() {
    return {
      user: this.state.fields,
      authenticity_token: document.querySelector('meta[name="csrf-token"]')
        .content
    };
  }

  updateField(e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.id]: e.target.value
      }
    });
  }
}
