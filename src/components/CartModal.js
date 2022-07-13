import React, { useContext } from "react";
import { GLobalContext } from "../context";
import { Link } from "react-router-dom";

const CartModal = () => {
  const { toggleCart, isCartOpen, cartItems, updateAmount } =
    useContext(GLobalContext);

  return (
    <div className={`${isCartOpen && "show-modal"} modal-overlay`}>
      <div className="cart-container light-bg d-flex align-items-center justify-content-center">
        <i onClick={toggleCart} className="bi bi-x-lg"></i>
        {!cartItems.length ? (
          <p>Aún no se han agregado artículos</p>
        ) : (
          <div className="cart-container text-center light-bg d-flex flex-column align-items-center justify-content-center py-4">
            <i onClick={toggleCart} className="bi bi-x-lg"></i>{" "}
            <div className="cart-row d-flex row">
              <p className="col-4">Ítem</p>
              <p className="col-4">Precio</p>
              <p className="col-4">Cantidad</p>
            </div>
            <ul className="ul d-flex flex-column align-items-center">
              {cartItems.map((i, index) => (
                <li key={index} className="row cart-row">
                  <p className="col-4 p">{i.code}</p>
                  <p className="col-4 p">${i.price}</p>
                  <p className="col-4 p">
                    <i
                      onClick={() => updateAmount(i.code, "dec")}
                      className="bi bi-chevron-left"
                    ></i>{" "}
                    {i.amount}{" "}
                    <i
                      onClick={() => updateAmount(i.code, "inc")}
                      className="bi bi-chevron-right"
                    ></i>
                  </p>
                </li>
              ))}
            </ul>
            <Link
              to={"/realizar-compra"}
              onClick={toggleCart}
              className="btn btn-success"
            >
              Realizar Compra
            </Link>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
