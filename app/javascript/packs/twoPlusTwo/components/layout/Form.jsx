import React from "react";
import axios from "axios";
import Input from "../layout/Input";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this.initFields(props.fields),
      errorMessage: ""
    };
  }

  render() {
    return (
      <div className="modal">
        <form>
          <i
            className="fa fa-close"
            aria-hidden="true"
            onClick={this.props.toggle}
          />
          {this.props.fields.map((field, i) => (
            <Input
              key={i}
              type={field.type}
              name={field.name}
              value={this.state.fields[field.name]}
              onChange={e => this.updateField(e)}
            />
          ))}
          <input onClick={this.send.bind(this)} type="submit" />
          <p>{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }

  send(e) {
    e.preventDefault();
    const that = this;

    axios
      .post(that.props.url, this.payload())
      .then(function(response) {
        const token = response.data["authenticity_token"];
        if (token) {
          that.props.updateAuthenticationToken(token);
        }
        that.props.callback(response);
        that.props.toggle();
      })
      .catch(function(response) {
        that.setState({ errorMessage: "Something went wrong!" });
      });
  }

  componentWillUnMount() {
    this.setState({
      fields: this.initFields(this.props.fields),
      errorMessage: ""
    });
  }

  initFields(fields) {
    return fields.reduce((obj, item) => {
      obj[item["name"]] = "";
      return obj;
    }, {});
  }

  updateField(e) {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.id]: e.target.value
      }
    });
  }

  payload() {
    return {
      [this.props.resource]: this.state.fields,
      authenticity_token: this.props.authenticityToken
    };
  }
}

export default Form;
