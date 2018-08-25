import React from "react";
import PropTypes from "prop-types";
import DefaultImage from "images/banksy-hero.jpg";

export default class Post extends React.Component {
  render() {
    const { title, subtitle, text, hero_image } = this.props.post;
    const style = { backgroundImage: `url(${hero_image || DefaultImage})` };

    return (
      <div className="post">
        <div className="background" style={style} />
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
