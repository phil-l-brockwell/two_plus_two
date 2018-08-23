import React from "react";
import PropTypes from "prop-types";

export default class DeletePostButton extends React.Component {
  constructor() {
    super();
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost() {
    const { handleDeletePost } = this.props;
    const { id } = this.props.post;

    fetch(`/api/posts/${id}`, { method: "DELETE" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(response => {
        handleDeletePost(id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <i className="fa fa-trash fa-lg" onClick={this.deletePost} />;
  }
}

DeletePostButton.propTypes = {
  handleDeletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};
