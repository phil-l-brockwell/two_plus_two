import React from "react";

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
    fetch("/users/current_user")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(response => {
        this.updateCurrentUser(response.user);
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
