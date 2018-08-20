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
  }

  getCurrentUser() {
    axios
      .get("/users/current_user")
      .then(response => {
        this.updateCurrentUser(response.data["user"]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateCurrentUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <CurrentUserContext.Provider
        value={{
          state: this.state,
          actions: {
            updateCurrentUser: this.updateCurrentUser.bind(this)
          }
        }}
      >
        {this.props.children}
      </CurrentUserContext.Provider>
    );
  }
}
