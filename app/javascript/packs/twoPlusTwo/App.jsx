import React from "react";
import axios from "axios";
import PageRouter from "./PageRouter";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      authenticationToken: document.querySelector('meta[name="csrf-token"]').content,
      showPostForm: false
    };
  }

  getCurrentUser() {
    axios
      .get("users/current_user")
      .then(response => {
        this.updateCurrentUser(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateCurrentUser(response) {
    this.setState({ currentUser: response.data["user"] });
  }

  removeCurrentUser() {
    this.setState({ currentUser: null });
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  updateAuthenticationToken(newToken) {
    this.setState({ authenticationToken: newToken });
  }

  togglePostForm() {
    this.setState({ showPostForm: !this.state.showPostForm });
  }

  render() {
    return (
      <PageRouter
        currentUser={this.state.currentUser}
        updateCurrentUser={this.updateCurrentUser.bind(this)}
        removeCurrentUser={this.removeCurrentUser.bind(this)}
        authenticationToken={this.state.authenticationToken}
        updateAuthenticationToken={this.updateAuthenticationToken.bind(this)}
        showPostForm={this.state.showPostForm}
        togglePostForm={this.togglePostForm.bind(this)}
      />
    );
  }
}

export default App;
