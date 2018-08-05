import React from "react";
import PropTypes from "prop-types";

class Input extends React.Component {
  render() {
    switch (this.props.type) {
      case "text":
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
    }
  }
}

Input.defaultProps = {
  type: 'text'
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default Input;
