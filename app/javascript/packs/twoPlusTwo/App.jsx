import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostsPage from "./components/pages/PostsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import { CurrentUserProvider } from "./CurrentUser";
import Layout from "./components/layout/Layout";

export default class App extends Component {
  render() {
    return (
      <CurrentUserProvider>
        <Router>
          <Layout>
            <Switch>
              <Route path="/app/posts/:id" component={PostsPage} />
              <Route path="/app/posts" component={PostsPage} />
              <Route exact path="/app/" component={PostsPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Layout>
        </Router>
      </CurrentUserProvider>
    );
  }
}
