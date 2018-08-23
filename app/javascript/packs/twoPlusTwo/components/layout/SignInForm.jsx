import React from "react";
import Form from "./Form";

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
    this.updateField = this.updateField.bind(this);
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
    const { fields, errorMessage } = this.state;
    const fieldTypes = this.fieldTypes;

    return (
      <Form
        resource="user"
        toggle={toggle}
        errorMessage={errorMessage}
        fields={fields}
        fieldTypes={fieldTypes}
        updateField={this.updateField}
        send={this.send}
      />
    );
  }

  payload() {
    return {
      method: "POST",
      body: JSON.stringify({
        user: this.state.fields,
        authenticity_token: document.querySelector('meta[name="csrf-token').content
      }),
      headers: {
        "Content-Type": "application/json"
      }
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
