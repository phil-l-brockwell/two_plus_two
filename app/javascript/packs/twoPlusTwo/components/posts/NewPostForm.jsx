import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "../layout/Form";

export default class NewPostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        title: "",
        subtitle: "",
        text: ""
      },
      errorMessage: ""
    };
    this.fieldTypes = { title: "text", subtitle: "text", text: "textarea" };
    this.send = this.send.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  render() {
    const { toggle } = this.props;
    const { fields, errorMessage } = this.state;
    const fieldTypes = this.fieldTypes;

    return (
      <Form
        resource="post"
        toggle={toggle}
        errorMessage={errorMessage}
        fields={fields}
        fieldTypes={fieldTypes}
        updateField={this.updateField}
        send={this.send}
      />
    );
  }

  send(e) {
    e.preventDefault();
    const { handleCreatePost, toggle } = this.props;

    axios
      .post("/api/posts", this.payload())
      .then(response => {
        handleCreatePost(response.data.post);
        toggle();
      })
      .catch(response => {
        console.log(response);
      });
  }

  updateField(e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.id]: e.target.value
      }
    });
  }

  payload() {
    return {
      post: this.state.fields
    };
  }
}

NewPostForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  handleCreatePost: PropTypes.func.isRequired
};
