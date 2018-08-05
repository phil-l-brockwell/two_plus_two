import React from "react";
import PostChanger from "../posts/PostChanger";
import BackgroundImage from "images/banksy-hero.jpg";

class Post extends React.Component {
  render() {
    return (
      <div className="post">
        <div className="background" />
        <div className="headings">
          <PostChanger
            direction={"back"}
            move={this.props.changeCurrentPost.bind(this)}
            newIndex={this.props.previousIndex}
          />
          <h1>{this.props.post.title}</h1>
          <h2>{this.props.post.subtitle}</h2>
          <PostChanger
            direction={"next"}
            move={this.props.changeCurrentPost.bind(this)}
            newIndex={this.props.nextIndex}
          />
        </div>
        <p>{this.props.post.text}</p>
      </div>
    );
  }
}

export default Post;
