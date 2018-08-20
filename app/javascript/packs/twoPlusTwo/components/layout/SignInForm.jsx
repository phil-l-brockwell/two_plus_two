import React from "react";
import axios from "axios";
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
