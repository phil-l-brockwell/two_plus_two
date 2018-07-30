import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  render() {
    return (
      <div className="page">
        <Header currentUser={this.state.currentUser} />
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
