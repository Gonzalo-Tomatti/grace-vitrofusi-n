import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GLobalContext } from "../context";

const MakePurchase = () => {
  const { handleChange, purchaseData } = useContext(GLobalContext);
  return (
    <div className="section p-3">
      <div className="container d-flex justify-content-center">
        <form>
          <h4 className="text-center">Método de pago:</h4>
          <div className="d-flex mt-4">
            <label>Selecciona un método de pago: </label>
            <select
              name="category"
              className=" mx-2"
              onChange={handleChange}
              value={purchaseData.method}
            >
              <option value="">-----</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
            </select>
          </div>
          <label htmlFor="number" className="form-label mt-3">
            Número de tarjeta
          </label>
          <input
            onChange={handleChange}
            value={purchaseData.number}
            type="text"
            className="form-input"
            name="number"
            id="number"
            placeholder="Ingrese N° de tarjeta"
            required
          ></input>
          <h4 className="mt-4 text-center">Información de facturación:</h4>
          <div className="d-md-flex align-items-center">
            <div>
              <label htmlFor="name" className="form-label mt-3">
                Nombre
              </label>
              <input
                type="text"
                className="form-input"
                name="name"
                id="name"
                required
              ></input>
            </div>
            <div className="ms-md-3">
              <label htmlFor="last-name" className="form-label mt-3">
                Apellido
              </label>
              <input
                type="text"
                className="form-input"
                name="last-name"
                id="last-name"
                required
              ></input>
            </div>
          </div>
          <div className="d-md-flex align-items-center">
            <div>
              <label htmlFor="email" className="form-label mt-3">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                name="email"
                id="email"
                required
              ></input>
            </div>
            <div className="ms-md-3">
              <label htmlFor="phone" className="form-label mt-3">
                Número de teléfono
              </label>
              <input
                type="text"
                className="form-input"
                name="phone"
                id="phone"
                required
              ></input>
            </div>
          </div>
          <Link
            to={"/finalizar-compra"}
            className="btn btn-success mt-4 d-block mx-auto purchase-link"
          >
            Continuar
          </Link>
        </form>
      </div>
    </div>
  );
};

export default MakePurchase;
