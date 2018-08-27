import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DefaultImage from "images/banksy-hero.jpg";

export default class PostListItem extends React.Component {
  render() {
    const { title, id, backgroundImage, selected } = this.props;
    const style = {
      backgroundImage: `url(${backgroundImage || DefaultImage})`
    };
    var className = "post-list-item";

    if (selected) {
      className += " current-post-list-item";
    }

    return (
      <Link to={`/app/posts/${id}`} className={className} style={style}>
        {title}
      </Link>
    );
  }
}

PostListItem.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
};
