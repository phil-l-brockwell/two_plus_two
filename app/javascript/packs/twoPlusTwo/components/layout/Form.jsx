import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../layout/Input";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.keys(this.props.fieldTypes).forEach(
      field => (this.state[field] = this.props.values[field] || "")
    );
  }

  render() {
    const { resource, toggle, errorMessage, send, fieldTypes } = this.props;

    const inputs = Object.keys(fieldTypes).map((field, i) => (
      <Input
        key={i}
        name={field}
        value={this.state[field]}
        type={fieldTypes[field]}
        onChange={e => this.updateField(e)}
      />
    ));

    return (
      <div className="modal">
        <form className={`${resource}-form`}>
          <i className="fa fa-close" aria-hidden="true" onClick={toggle} />
          {inputs}
          <input onClick={send} type="submit" />
          <p>{errorMessage}</p>
        </form>
      </div>
    );
  }

  updateField(e) {
    var value = e.target.value;

    if (e.target.files) {
      value = e.target.files[0];
    }

    this.setState({
      ...this.state,
      [e.target.id]: value
    });
  }

  fields() {
    return this.state;
  }
}

Form.defaultProps = {
  values: {}
};

Form.propTypes = {
  resource: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  values: PropTypes.object,
  fieldTypes: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  send: PropTypes.func.isRequired
};
