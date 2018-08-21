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
            <Route path="/" component={PostsPage} />
            <Route path="posts" component={PostsPage} />
          </Layout>
        </Router>
      </CurrentUserProvider>
    );
  }
}
