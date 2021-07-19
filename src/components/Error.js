import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Error extends Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <h1 style={{ color: "red", fontWeight: "bold" }}>Что-то пошло не так</h1>
        <NavLink to="/"> Вернуться на главную </NavLink>
      </div>
    );
  }
}

export default Error;