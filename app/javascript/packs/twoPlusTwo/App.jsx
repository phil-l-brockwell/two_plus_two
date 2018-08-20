import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PostsPage from "./components/pages/PostsPage";
import { CurrentUserProvider } from "./CurrentUser";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticationToken: document.querySelector('meta[name="csrf-token"]')
        .content
    };
    this.updateAuthenticationToken = this.updateAuthenticationToken.bind(this);
  }

  updateAuthenticationToken(newToken) {
    this.setState({ authenticationToken: newToken });
  }

  render() {
    return (
      <CurrentUserProvider>
        <Router>
          <div className="page">
            <Header
              authenticationToken={this.state.authenticationToken}
              updateAuthenticationToken={this.updateAuthenticationToken}
            />
            <Route exact path="/" component={PostsPage} />
            <Route exact path="/posts" component={PostsPage} />
            <Footer />
          </div>
        </Router>
      </CurrentUserProvider>
    );
  }
}
