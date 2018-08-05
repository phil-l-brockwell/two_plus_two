import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import PostsPage from "./components/pages/PostsPage";
import LandingPage from "./components/pages/LandingPage";
import Header from "./components/layout/Header";
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
            removeCurrentUser={this.props.removeCurrentUser}
          />
          <Route
            exact
            path="/"
            render={props => <PostsPage currentUser={this.props.currentUser} />}
          />
          <Route
            exact
            path="/posts"
            render={props => <PostsPage currentUser={this.props.currentUser} />}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

PageRouter.propTypes = {
  currentUser: PropTypes.object,
  authenticationToken: PropTypes.string.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  updateAuthenticationToken: PropTypes.func.isRequired,
  removeCurrentUser: PropTypes.func.isRequired
};

export default PageRouter;
