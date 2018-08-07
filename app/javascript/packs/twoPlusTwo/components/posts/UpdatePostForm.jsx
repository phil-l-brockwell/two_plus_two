import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Input from "../layout/Input";

class UpdatePostForm extends React.Component {
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

    return (
      <div className="modal">
        <form className="post-form">
          <i
            className="fa fa-close"
            aria-hidden="true"
            onClick={this.props.toggle}
          />
          {fields}
          <input onClick={this.send.bind(this)} type="submit" />
          <p>{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }

  send(e) {
    e.preventDefault();
    const that = this;

    axios
      .put(`/api/posts/${this.props.post.id}`, this.payload())
      .then(function(response) {
        that.props.callback(response);
        that.props.toggle();
      })
      .catch(function(response) {
        that.setState({ errorMessage: "Something went wrong!" });
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
  callback: PropTypes.func.isRequired
};

export default UpdatePostForm;
