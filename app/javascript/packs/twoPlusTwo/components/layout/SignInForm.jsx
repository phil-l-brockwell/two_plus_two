import React, { Component } from "react";
import Form from "./Form";

export default class SignInForm extends Component {
  constructor() {
    super();
    this.state = { errorMessage: "" };
    this.fieldTypes = { email: "text", password: "password" };
    this.send = this.send.bind(this);
    this.form = React.createRef();
  }

  send(e) {
    e.preventDefault();
    const { updateCurrentUser, toggle } = this.props;

    fetch("/users/sign_in.json", this.payload())
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
        toggle();
      })
      .catch(response => {
        console.log(response);
      });
  }

  render() {
    const { toggle } = this.props;
    const { errorMessage } = this.state;

    return (
      <Form
        ref={this.form}
        resource="user"
        toggle={toggle}
        errorMessage={errorMessage}
        fieldTypes={this.fieldTypes}
        send={this.send}
      />
    );
  }

  payload() {
    const fields = this.form.current.fields();
    const formData = new FormData();

    Object.keys(fields).forEach(field =>
      formData.append(`user[${field}]`, fields[field])
    );

    formData.append(
      "authenticity_token",
      document.querySelector('meta[name="csrf-token').content
    );

    return {
      method: "POST",
      body: formData
    };
  }
}
