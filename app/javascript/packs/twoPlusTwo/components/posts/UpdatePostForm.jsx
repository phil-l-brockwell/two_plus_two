import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "../layout/Form";

export default class UpdatePostForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "" };
    this.values = {
      title: this.props.post.title,
      subtitle: this.props.post.subtitle,
      text: this.props.post.text
    };
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
        values={this.values}
      />
    );
  }

  send(e) {
    e.preventDefault();
    const { handleUpdatePost, toggle } = this.props;
    const { id } = this.props.post;

    fetch(`/api/posts/${id}`, this.payload())
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(response => {
        handleUpdatePost(response.post);
        toggle();
      })
      .catch(response => {
        console.log(response);
      });
  }

  payload() {
    const fields = this.form.current.fields();
    const formData = new FormData();

    Object.keys(fields).forEach(field => {
      if (fields[field] !== "") {
        formData.append(`post[${field}]`, fields[field]);
      }
    });

    return {
      method: "PUT",
      body: formData
    };
  }
}

UpdatePostForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  post: PropTypes.object,
  handleUpdatePost: PropTypes.func.isRequired
};
