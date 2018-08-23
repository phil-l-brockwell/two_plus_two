import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class PostListItem extends React.Component {
  render() {
    const { title, id } = this.props;

    return (
      <Link to={`/posts/${id}`} className={this.classNameString()}>
        {title}
      </Link>
    );
  }

  classNameString() {
    const { selected } = this.props;
    var s = "post-list-item";

    if (selected) {
      s += " current-post-list-item";
    }

    return s;
  }
}

PostListItem.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
};
