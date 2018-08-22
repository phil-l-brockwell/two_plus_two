import React from "react";
import PropTypes from "prop-types";

class Post extends React.Component {
  render() {
    const { title, subtitle, text } = this.props.post;

    return (
      <div className="post">
        <div className="background" />
        <div className="headings">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
        <p>{text}</p>
      </div>
    );
  }
}

Post.defaultProps = {
  post: { title: "Loading..." }
};

Post.propTypes = {
  post: PropTypes.object
};

export default Post;
