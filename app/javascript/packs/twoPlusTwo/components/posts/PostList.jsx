import React from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem";

export default class PostList extends React.Component {
  render() {
    const { posts, currentPost } = this.props;

    return (
      <div className="post-list">
        {posts.map(post => {
          const { id, title, hero_image } = post;

          return (
            <PostListItem
              key={id}
              title={title}
              selected={post === currentPost}
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
