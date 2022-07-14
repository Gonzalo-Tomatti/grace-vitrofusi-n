import React, { useContext } from "react";
import { GLobalContext } from "../context";

const PlsLogin = () => {
  const { plsLogin, togglePlsLogin } = useContext(GLobalContext);
  return (
    <div className={`${plsLogin && "show-modal"} modal-overlay`}>
      <div className="login-container text-center light-bg d-flex flex-column justify-content-center align-items-center  py-4">
        <h4 className="mb-4">Usted no se ha identificado.</h4>
        <p>Por favor inicie sesión para realizar compras. Gracias.</p>
        <button onClick={togglePlsLogin} className="btn btn-success mt-3">
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default PlsLogin;
