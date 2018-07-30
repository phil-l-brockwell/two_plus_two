import React from "react";

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

export default PostChanger;
