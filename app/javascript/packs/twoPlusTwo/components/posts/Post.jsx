import React from "react";
import PropTypes from "prop-types";
import PostChanger from "../posts/PostChanger";
import BackgroundImage from "images/banksy-hero.jpg";

class Post extends React.Component {
  render() {
    return (
      <div className="post">
        <div className="background" />
        <div className="headings">
          <PostChanger
            direction={"left"}
            move={this.props.changeCurrentPost.bind(this)}
            newIndex={this.props.previousIndex}
          />
          <h1>{this.props.post.title}</h1>
          <h2>{this.props.post.subtitle}</h2>
          <PostChanger
            direction={"right"}
            move={this.props.changeCurrentPost.bind(this)}
            newIndex={this.props.nextIndex}
          />
        </div>
        <p>{this.props.post.text}</p>
      </div>
    );
  }
}

Post.defaultProps = {
  post: { title: "Loading..." }
};

Post.propTypes = {
  changeCurrentPost: PropTypes.func.isRequired,
  previousIndex: PropTypes.number.isRequired,
  nextIndex: PropTypes.number.isRequired,
  post: PropTypes.object
};

export default Post;
