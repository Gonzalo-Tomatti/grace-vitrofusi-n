import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GLobalContext } from "../context";

const MakePurchase = () => {
  const { handleChange, purchaseData } = useContext(GLobalContext);
  const [emptyFields, setEmptyFields] = useState(false);
  const navigate = useNavigate();
  const goToCompletePurchase = (e) => {
    e.preventDefault();
    if (
      purchaseData.method === "" ||
      purchaseData.number === "" ||
      purchaseData.name === "" ||
      purchaseData.lastName === "" ||
      purchaseData.phone === "" ||
      purchaseData.address === ""
    ) {
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 3000);
    } else {
      navigate("../finalizar-compra");
    }
  };
  return (
    <div className="section p-3">
      <div className="container d-flex justify-content-center">
        <form>
          <h4 className="text-center">Método de pago:</h4>
          <div className="d-flex mt-4">
            <label>Selecciona un método de pago: </label>
            <select
              name="method"
              className=" mx-2"
              onChange={handleChange}
              value={purchaseData.method}
            >
              <option value="">-----</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
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
                value={purchaseData.name}
                onChange={handleChange}
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
                onChange={handleChange}
                value={purchaseData.lastName}
                className="form-input"
                name="lastName"
                id="last-name"
                required
              ></input>
            </div>
          </div>
          <div className="d-md-flex align-items-center">
            <div>
              <label htmlFor="phone" className="form-label mt-3">
                Número de teléfono
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={purchaseData.phone}
                className="form-input"
                name="phone"
                id="phone"
                required
              ></input>
            </div>
            <div className="ms-md-3">
              <label htmlFor="phone" className="form-label mt-3">
                Dirección
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={purchaseData.address}
                className="form-input"
                name="address"
                id="address"
                required
              ></input>
            </div>
          </div>
          {emptyFields && (
            <p className="text-danger p mt-2">
              Por favor compete todos los campos.
            </p>
          )}
          <button
            onClick={goToCompletePurchase}
            className="btn btn-success mt-4 d-block mx-auto purchase-link"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePurchase;
