import React from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem";

export default class PostList extends React.Component {
  render() {
    const { posts, changeCurrentPostIndex, currentPost } = this.props;

    return (
      <div className="post-list">
        {posts.map((post, i) => {
          const { id, title } = post;

          return (
            <PostListItem
              key={id}
              onClick={() => changeCurrentPostIndex(i)}
              title={title}
              selected={post === currentPost}
            />
          );
        })}
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  changeCurrentPostIndex: PropTypes.func.isRequired,
  currentPost: PropTypes.object.isRequired
};
