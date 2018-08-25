import React from "react";
import PropTypes from "prop-types";
import Form from "../layout/Form";

export default class NewPostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        title: "",
        subtitle: "",
        text: "",
        hero_image: ""
      },
      errorMessage: ""
    };
    this.fieldTypes = {
      title: "text",
      subtitle: "text",
      text: "textarea",
      hero_image: "file"
    };
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

  updateField(e) {
    var value = e.target.value;

    if (e.target.files) {
      value = e.target.files[0];
    }

    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.id]: value
      }
    });
  }

  payload() {
    const formData = new FormData();
    Object.keys(this.state.fields).map(field =>
      formData.append(`post[${field}]`, this.state.fields[field])
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
