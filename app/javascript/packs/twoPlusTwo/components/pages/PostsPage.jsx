import React from "react";
import PropTypes from "prop-types";
import Post from "../posts/Post";
import PostList from "../posts/PostList";
import UpdatePostForm from "../posts/UpdatePostForm";
import NewPostForm from "../posts/NewPostForm";
import AdminControls from "../layout/AdminControls";
import DeletePostButton from "../posts/DeletePostButton";
import { CurrentUserConsumer } from "../../CurrentUser";

export default class PostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      showNewPostForm: false,
      showUpdatePostForm: false,
      currentPostId: +this.props.match.params.id || null
    };
    this.toggleUpdatePostForm = this.toggleUpdatePostForm.bind(this);
    this.toggleNewPostForm = this.toggleNewPostForm.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleUpdatePost = this.handleUpdatePost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }

  fetchPosts() {
    fetch("/api/posts")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(response => {
        this.setState({ posts: response.posts });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    this.fetchPosts();
  }

  componentWillReceiveProps(newProps) {
    this.setState({ currentPostId: +newProps.match.params.id });
  }

  currentPost() {
    return (
      this.state.posts.find(post => {
        return post.id === this.state.currentPostId;
      }) || this.state.posts[0]
    );
  }

  handleDeletePost(deletedPostId) {
    var posts = this.state.posts.slice();
    const deletedPostIndex = posts.findIndex(post => {
      return post.id === deletedPostId;
    });

    posts.splice(deletedPostIndex, 1);
    this.setState(prevState => ({
      posts: posts
    }));
  }

  handleCreatePost(newPost) {
    var posts = this.state.posts.slice();
    posts.push(newPost);
    this.setState({ posts: posts });
  }

  handleUpdatePost(updatedPost) {
    var posts = this.state.posts.slice();
    const updatedPostIndex = posts.findIndex(post => {
      return post.id === updatedPost.id;
    });

    posts.splice(updatedPostIndex, 1, updatedPost);
    this.setState({ posts: posts });
  }

  toggleNewPostForm() {
    this.setState(prevState => ({
      showNewPostForm: !prevState.showNewPostForm
    }));
  }

  toggleUpdatePostForm() {
    this.setState(prevState => ({
      showUpdatePostForm: !prevState.showUpdatePostForm
    }));
  }

  render() {
    const currentPost = this.currentPost();
    const { posts, showNewPostForm, showUpdatePostForm } = this.state;

    return (
      <CurrentUserConsumer>
        {context => {
          const { user } = context.state;

          return (
            <div className="content">
              <PostList posts={posts} currentPost={currentPost} />
              <Post post={currentPost} />
              {user && user.admin ? (
                <AdminControls>
                  <i
                    className="fa fa-edit fa-lg"
                    onClick={this.toggleUpdatePostForm}
                  />
                  <DeletePostButton
                    post={currentPost}
                    handleDeletePost={this.handleDeletePost}
                  />
                  <i
                    className="fa fa-file fa-lg"
                    onClick={this.toggleNewPostForm}
                  />
                </AdminControls>
              ) : null}
              {showNewPostForm ? (
                <NewPostForm
                  handleCreatePost={this.handleCreatePost}
                  toggle={this.toggleNewPostForm}
                />
              ) : null}
              {showUpdatePostForm ? (
                <UpdatePostForm
                  toggle={this.toggleUpdatePostForm}
                  post={currentPost}
                  handleUpdatePost={this.handleUpdatePost}
                />
              ) : null}
            </div>
          );
        }}
      </CurrentUserConsumer>
    );
  }
}
