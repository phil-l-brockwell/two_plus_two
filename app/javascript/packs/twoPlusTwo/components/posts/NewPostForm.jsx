import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "../layout/Form";

export default class NewPostForm extends Component {
  constructor() {
    super();
    this.state = { errorMessage: "" };
    this.fieldTypes = {
      title: "text",
      subtitle: "text",
      text: "textarea",
      hero_image: "file"
    };
    this.send = this.send.bind(this);
    this.form = React.createRef();
  }

  render() {
    const { toggle } = this.props;
    const { errorMessage } = this.state;

    return (
      <Form
        ref={this.form}
        resource="post"
        toggle={toggle}
        errorMessage={errorMessage}
        fieldTypes={this.fieldTypes}
        send={this.send}
      />
    );
  }

  send(e) {
    e.preventDefault();
    const { handleCreatePost, toggle } = this.props;

    fetch("/api/posts", this.payload())
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(response => {
        handleCreatePost(response.post);
        toggle();
      })
      .catch(response => {
        console.log(response);
      });
  }

  payload() {
    const fields = this.form.current.fields();
    const formData = new FormData();

    Object.keys(fields).forEach(field =>
      formData.append(`post[${field}]`, fields[field])
    );

    return {
      method: "POST",
      body: formData
    };
  }
}

NewPostForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  handleCreatePost: PropTypes.func.isRequired
};
