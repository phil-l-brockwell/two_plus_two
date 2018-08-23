import React from "react";
import PropTypes from "prop-types";

export default class PostListItem extends React.Component {
  render() {
    const { onClick, title } = this.props;

    return (
      <div className={this.classNameString()} onClick={onClick}>
        {title}
      </div>
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
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};
