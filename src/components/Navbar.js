import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md black-bg py-3">
      <div className="container">
        <NavLink className={"navbar-brand light-color"} to="/">
          Grace Vitrofusión
        </NavLink>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav-links"
        >
          <i className="bi bi-menu-button-wide light-color "></i>
        </button>
        <div className="collapse navbar-collapse" id="nav-links">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={"navlink"} to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"navlink"} to="acerca-de-grace">
                Acerca de Grace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"navlink"} to="contacto">
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
