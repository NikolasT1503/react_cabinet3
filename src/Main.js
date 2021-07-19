import React, { Component } from "react";
import HeaderWithRouter from "./components/Header/Header";
import RoutsWithRouter from "./components/Routs";

class Main extends Component {
  render() {
    return (
      <div className="p-grid p-dir-col">
        <div className="p-col"> <HeaderWithRouter /> </div>
        <div className="p-col p-justify-center"><RoutsWithRouter /></div>
        <div className="p-col"> </div>
      </div>
    );
  }
}

export default Main;
