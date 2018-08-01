import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import PostsPage from "./components/pages/PostsPage";

class PageRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      csrfToken: document.querySelector('meta[name="csrf-token"]').content
    };
  }

  getCurrentUser() {
    axios
      .get("users/current_user")
      .then(response => {
        const user = response.data["user"];
        var email = null;

        if (user) {
          email = user.email;
        }

        this.setState({ currentUser: email });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  _updateCsrfToken(newToken) {
    this.setState({ csrfToken: newToken });
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={props => (
              <PostsPage
                currentUser={this.state.currentUser}
                getCurrentUser={this.getCurrentUser.bind(this)}
                csrfToken={this.state.csrfToken}
                updateCsrfToken={this._updateCsrfToken.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/posts"
            render={props => (
              <PostsPage
                currentUser={this.state.currentUser}
                getCurrentUser={this.getCurrentUser.bind(this)}
                csrfToken={this.state.csrfToken}
                updateCsrfToken={this._updateCsrfToken.bind(this)}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default PageRouter;
