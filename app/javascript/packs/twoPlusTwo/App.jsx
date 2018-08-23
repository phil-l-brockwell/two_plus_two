import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostsPage from "./components/pages/PostsPage";
import { CurrentUserProvider } from "./CurrentUser";
import Layout from "./components/layout/Layout";

export default class App extends React.Component {
  render() {
    return (
      <CurrentUserProvider>
        <Router>
          <Layout>
            <Route exact path="/" component={PostsPage} />
            <Route exact path="/posts" component={PostsPage} />
            <Route exact path="/posts/:id" component={PostsPage} />
          </Layout>
        </Router>
      </CurrentUserProvider>
    );
  }
}
