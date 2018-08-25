import React, { Fragment } from "react";
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
      case "file":
        var labelText = `Select ${name}`;

        if (value) {
          labelText += ` - ${value.name}`;
        }

        return (
          <Fragment>
            <label htmlFor={name}>{labelText}</label>
            <input
              type="file"
              id={name}
              style={{ visibility: "hidden" }}
              onChange={onChange}
            />
          </Fragment>
        );
    }
  }
}

Input.defaultProps = {
  type: "text"
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func
};
