import React, { useContext } from "react";
import { GLobalContext } from "../context";
import { Link } from "react-router-dom";

const PurchaseDetails = () => {
  const { purchaseDetails } = useContext(GLobalContext);
  const p = purchaseDetails;
  return (
    <div className="section p-3">
      <Link to={"/historial"} className="btn btn-success my-4 ">
        Volver atrás
      </Link>
      <p>
        Compra realizada a nombre de {p.name} {p.lastName}.
      </p>
      <p>N° de teléfono: {p.phone}.</p>
      <p>Enviado a {p.address}.</p>
      <p>Método: {p.method}.</p>
      <p>N° de tarjeta: {p.number}.</p>
      <p>Total de ${p.total} por la compra de los siguientes productos:</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Ítem</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {p.items.map((i, index) => (
            <tr key={index}>
              <td>{i.code}</td>
              <td>${i.price}</td>
              <td>{i.amount}</td>
              <td>${i.price * i.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseDetails;
