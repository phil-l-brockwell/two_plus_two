import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import PostsPage from "./components/pages/PostsPage";

class PageRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  getCurrentUser() {
    axios
      .get("users/current_user")
      .then(response => {
        this.setState({ currentUser: response.data["user"] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={props => <PostsPage currentUser={this.state.currentUser} />}
          />
          <Route
            exact
            path="/posts"
            render={props => <PostsPage currentUser={this.state.currentUser} />}
          />
        </div>
      </Router>
    );
  }
}

export default PageRouter;
