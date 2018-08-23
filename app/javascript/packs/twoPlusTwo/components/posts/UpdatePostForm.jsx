import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "../layout/Form";

export default class UpdatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        title: this.props.post.title,
        subtitle: this.props.post.subtitle,
        text: this.props.post.text
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
    const { handleUpdatePost, toggle } = this.props;
    const { id } = this.props.post;

    axios
      .put(`/api/posts/${id}`, this.payload())
      .then(response => {
        handleUpdatePost(response.data.post);
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

UpdatePostForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  handleUpdatePost: PropTypes.func.isRequired
};
