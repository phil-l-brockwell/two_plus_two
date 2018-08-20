import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PostsPage from "./components/pages/PostsPage";
import { CurrentUserProvider } from "./CurrentUser";

export default class App extends React.Component {
  render() {
    return (
      <CurrentUserProvider>
        <Router>
          <div className="page">
            <Header />
            <Route exact path="/" component={PostsPage} />
            <Route exact path="/posts" component={PostsPage} />
            <Footer />
          </div>
        </Router>
      </CurrentUserProvider>
    );
  }
}
