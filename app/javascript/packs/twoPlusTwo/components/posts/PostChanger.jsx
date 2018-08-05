import React from "react";
import PropTypes from "prop-types";

class PostChanger extends React.Component {
  render() {
    return (
      <button
        className={`post-changer ${this.props.direction}-post-changer`}
        onClick={() => this.props.move(this.props.newIndex)}
      />
    );
  }
}

PostChanger.propTypes = {
  direction: PropTypes.oneOf(["back", "next"]).isRequired,
  newIndex: PropTypes.number.isRequired
};

export default PostChanger;
