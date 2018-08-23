import React from "react";
import PropTypes from "prop-types";

export default class Input extends React.Component {
  render() {
    const { type, name, value, onChange } = this.props;

    switch (type) {
      case "text":
        return (
          <input
            type="text"
            id={name}
            placeholder={`enter ${name}...`}
            value={value}
            onChange={onChange}
          />
        );
      case "textarea":
        return (
          <textarea
            id={name}
            placeholder={`enter ${name}...`}
            value={value}
            onChange={onChange}
            rows="10"
          />
        );
      case "password":
        return (
          <input
            type="password"
            id={name}
            placeholder={`enter ${name}...`}
            value={value}
            onChange={onChange}
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
