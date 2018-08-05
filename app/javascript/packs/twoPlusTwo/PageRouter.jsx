import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostsPage from "./components/pages/PostsPage";
import LandingPage from "./components/pages/LandingPage";
import Header from './components/layout/Header';
import Footer from "./components/layout/Footer";

class PageRouter extends React.Component {
  render() {
    return (
      <Router>
        <div className="page">
          <Header
            currentUser={this.props.currentUser}
            authenticationToken={this.props.authenticationToken}
            updateCurrentUser={this.props.updateCurrentUser}
            updateAuthenticationToken={this.props.updateAuthenticationToken}
            togglePostForm={this.props.togglePostForm}
            removeCurrentUser={this.props.removeCurrentUser}
          />
          <Route
            exact
            path="/"
            render={props => (
              <PostsPage
                currentUser={this.props.currentUser}
                showPostForm={this.props.showPostForm}
                togglePostForm={this.props.togglePostForm}
              />
            )}
          />
          <Route
            exact
            path="/posts"
            render={props => (
              <PostsPage
                currentUser={this.props.currentUser}
                showPostForm={this.props.showPostForm}
                togglePostForm={this.props.togglePostForm}
              />
            )}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default PageRouter;
