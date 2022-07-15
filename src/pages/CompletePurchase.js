import React, { useContext } from "react";
import { GLobalContext } from "../context";
import { Link } from "react-router-dom";
import CartList from "../components/CartList";

const CompletePurchase = () => {
  const { cartItems, purchaseData, makePurchase } = useContext(GLobalContext);
  return (
    <div className="section p-3">
      <Link to={"/realizar-compra"} className="btn btn-success mt-4 ">
        Volver atrás
      </Link>
      <div className="text-center d-flex flex-column align-items-center justify-content-center py-4">
        {!cartItems.length ? (
          <p>Aún no se han agregado artículos</p>
        ) : (
          <>
            <CartList />
            <p className="mt-3">
              Total: $
              {cartItems.reduce((total, current) => {
                return total + current.price;
              }, 0)}
            </p>
            <p>Método de pago: {purchaseData.method}</p>
            <p>Número de tarjeta: {purchaseData.number}</p>
            <Link
              to={"/historial"}
              onClick={makePurchase}
              className="btn btn-success"
            >
              Comprar
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CompletePurchase;
