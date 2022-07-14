import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../owl-logo.png";
import { GLobalContext } from "../context";

const Navbar = () => {
  const { toggleCart, cartItems, toggleLogin, isLoggedIn, closeSession } =
    useContext(GLobalContext);
  return (
    <nav className="navbar navbar-expand-md black-bg py-3">
      <div className="container">
        <NavLink className={"navbar-brand light-color"} to="/">
          <img className="logo" src={logo} alt="lechuza" />
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
            <li className="nav-item">
              {isLoggedIn ? (
                <p onClick={closeSession} className="navlink p">
                  Cerrar Sesión
                </p>
              ) : (
                <p onClick={toggleLogin} className="navlink p">
                  Iniciar Sesión
                </p>
              )}
            </li>
            <li className="nav-item">
              <i onClick={toggleCart} className="bi bi-cart-fill navlink">
                {cartItems.length ? (
                  <span className="item-count d-flex justify-content-center align-items-center">
                    {cartItems.length}
                  </span>
                ) : null}
              </i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
