import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default class Layout extends Component {
  render() {
    return (
      <div className="page">
        <Header />

        {this.props.children}

        <Footer />
      </div>
    );
  }
}
