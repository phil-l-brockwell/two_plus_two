import React from "react";
import PropTypes from "prop-types";
import Input from "../layout/Input";

export default class Form extends React.Component {
  render() {
    const {
      resource,
      toggle,
      errorMessage,
      send,
      updateField,
      fields,
      fieldTypes
    } = this.props;

    const inputs = Object.keys(fields).map((field, i) => (
      <Input
        key={i}
        name={field}
        value={fields[field]}
        type={fieldTypes[field]}
        onChange={e => updateField(e)}
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
}

Form.propTypes = {
  resource: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  fieldTypes: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  send: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired
}
