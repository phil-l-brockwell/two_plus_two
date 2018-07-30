import React from "react";
import PostChanger from "../posts/PostChanger";
import BackgroundImage from "images/banksy-hero.jpg";

class Post extends React.Component {
  constructor() {
    super();
  }

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
          <h1>{this.props.title}</h1>
          <h2>{this.props.subtitle}</h2>
          <PostChanger
            direction={"next"}
            move={this.props.changeCurrentPost.bind(this)}
            newIndex={this.props.nextIndex}
          />
        </div>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default Post;
