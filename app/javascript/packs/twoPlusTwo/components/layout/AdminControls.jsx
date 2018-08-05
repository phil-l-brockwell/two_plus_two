import React from "react";

class AdminControls extends React.Component {
  render() {
    return <div className="admin-controls">{this.props.children}</div>;
  }
}

export default AdminControls;
