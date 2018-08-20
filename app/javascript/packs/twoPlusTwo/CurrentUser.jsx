import React from "react";
import axios from "axios";

const CurrentUserContext = React.createContext();
export const CurrentUserConsumer = CurrentUserContext.Consumer;
export class CurrentUserProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.getCurrentUser();
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.removeCurrentUser = this.removeCurrentUser.bind(this);
  }

  getCurrentUser() {
    axios
      .get("/users/current_user")
      .then(response => {
        this.updateCurrentUser(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateCurrentUser(response) {
    this.setState({ user: response.data["user"] });
  }

  removeCurrentUser() {
    this.setState({ user: null });
  }

  render() {
    return (
      <CurrentUserContext.Provider
        value={{
          state: this.state,
          actions: {
            updateCurrentUser: this.updateCurrentUser,
            removeCurrentUser: this.removeCurrentUser
          }
        }}
      >
        {this.props.children}
      </CurrentUserContext.Provider>
    );
  }
}
