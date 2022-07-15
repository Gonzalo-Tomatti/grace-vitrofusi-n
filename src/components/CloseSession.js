import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GLobalContext } from "../context";

const CloseSession = () => {
  const { toggleCloseSession, closeSession, closeSessionFlag } =
    useContext(GLobalContext);
  const navigate = useNavigate();
  const goHome = () => {
    closeSession();
    toggleCloseSession();
    if (
      document.URL.includes("historial") ||
      document.URL.includes("finalizar-compra") ||
      document.URL.includes("realizar-compra")
    ) {
      navigate("/");
    }
  };
  return (
    <div className={`${closeSessionFlag && "show-modal"} modal-overlay`}>
      <div className="close-session-container light-bg d-flex justify-content-center align-items-center flex-column">
        <p>¿Está seguro que quiere cerrar la sesión?</p>
        <div>
          <button className="btn btn-success mx-2" onClick={toggleCloseSession}>
            Cancelar
          </button>
          <button className="btn btn-success mx-2" onClick={goHome}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseSession;
