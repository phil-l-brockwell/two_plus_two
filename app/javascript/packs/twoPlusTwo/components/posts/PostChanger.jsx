import React from "react";
import PropTypes from "prop-types";

class PostChanger extends React.Component {
  render() {
    return (
      <i
        className={`fa fa-angle-${this.props.direction} fa-3x`}
        aria-hidden="true"
        onClick={() => this.props.move(this.props.newIndex)}
      />
    );
  }
}

PostChanger.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  newIndex: PropTypes.number.isRequired
};

export default PostChanger;
