import React from "react";

class Input extends React.Component {
  render() {
    switch (this.props.type) {
      case "type":
        return (
          <input
            type="text"
            id={this.props.name}
            placeholder={`enter ${this.props.name}...`}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
      case "textarea":
        return (
          <textarea
            id={this.props.name}
            placeholder={`enter ${this.props.name}...`}
            value={this.props.value}
            onChange={this.props.onChange}
            rows="10"
          />
        );
      case "password":
        return (
          <input
            type="password"
            id={this.props.name}
            placeholder={`enter ${this.props.name}...`}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
      default:
        return (
          <input
            type="text"
            id={this.props.name}
            placeholder={`enter ${this.props.name}...`}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
    }
  }
}

export default Input;
