import React, { useContext } from "react";
import { GLobalContext } from "../context";

const LogIn = () => {
  const {
    isLoginOpen,
    toggleLogin,
    handleLogin,
    user,
    signUp,
    logIn,
    signupFlag,
    toggleSignupFlag,
  } = useContext(GLobalContext);

  return (
    <div className={`${isLoginOpen && "show-modal"} modal-overlay`}>
      <div className="login-container text-center light-bg d-flex flex-column align-items-center  py-4">
        <i onClick={toggleLogin} className="bi bi-x-lg"></i>
        <form className="d-flex flex-column justify-content-center align-items-center login-form">
          {signupFlag ? (
            <div>
              <h4>Crear cuenta</h4>
              <label htmlFor="username" className="form-label mt-3">
                Nombre de usuario
              </label>
              <input
                onChange={handleLogin}
                value={user.username}
                type="text"
                className="form-input"
                name="username"
                id="username"
                required
              ></input>
              <label htmlFor="password" className="form-label mt-3">
                Contraseña
              </label>
              <input
                onChange={handleLogin}
                value={user.password}
                type="text"
                className="form-input"
                name="password"
                id="password"
                required
              ></input>
              <label htmlFor="email" className="form-label mt-3">
                Email
              </label>
              <input
                onChange={handleLogin}
                value={user.email}
                type="email"
                className="form-input"
                name="email"
                id="email"
                required
              ></input>
              <button onClick={signUp} className="btn btn-success my-3">
                Crear
              </button>
            </div>
          ) : (
            <div>
              <h4>Iniciar sesión</h4>
              <label htmlFor="username" className="form-label mt-3">
                Nombre de usuario
              </label>
              <input
                onChange={handleLogin}
                value={user.username}
                type="text"
                className="form-input"
                name="username"
                id="username"
                required
              ></input>
              <label htmlFor="password" className="form-label mt-3">
                Contraseña
              </label>
              <input
                onChange={handleLogin}
                value={user.password}
                type="text"
                className="form-input"
                name="password"
                id="password"
                required
              ></input>
              <button onClick={logIn} className="btn btn-success my-3">
                Entrar
              </button>
              <p>¿No tienes cuenta todavía?</p>
              <button onClick={toggleSignupFlag} className="btn btn-success">
                Registrarse
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LogIn;
