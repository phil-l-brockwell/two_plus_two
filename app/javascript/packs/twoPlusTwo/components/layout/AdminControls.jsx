import React, { Component } from "react";

class AdminControls extends Component {
  render() {
    return <div className="admin-controls">{this.props.children}</div>;
  }
}

export default AdminControls;
