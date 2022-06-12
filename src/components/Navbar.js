import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3">
      <div className="container">
        <NavLink className={"navbar-brand"} to="/">
          Grace Vitrofusión
        </NavLink>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav-links"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav-links">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={"nav-link"} to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"nav-link"} to="acerca-de-grace">
                Acerca de Grace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"nav-link"} to="contacto">
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
