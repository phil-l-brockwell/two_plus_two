import React, { Component } from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem";

export default class PostList extends Component {
  render() {
    const { posts, currentPost } = this.props;

    return (
      <div className="post-list">
        {posts.map(({ id, title, hero_image }) => {
          return (
            <PostListItem
              key={id}
              title={title}
              selected={id === currentPost.id}
              id={id}
              backgroundImage={hero_image}
            />
          );
        })}
      </div>
    );
  }
}

PostList.defaultProps = {
  post: { title: "Loading..." }
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  currentPost: PropTypes.object
};
