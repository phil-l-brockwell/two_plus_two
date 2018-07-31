import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

class Page extends React.Component {
  render() {
    return (
      <div className="page">
        <Header currentUser={this.props.currentUser} />
        <div className="content">{this._content()}</div>
        <Footer />
      </div>
    );
  }

  _content() {
    return <p>No content</p>;
  }
}

export default Page;
