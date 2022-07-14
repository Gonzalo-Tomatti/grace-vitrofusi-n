import React, { useContext } from "react";
import { GLobalContext } from "../context";
import CartList from "./CartList";
import { Link } from "react-router-dom";

const CartModal = () => {
  const { toggleCart, isCartOpen, cartItems, updateAmount } =
    useContext(GLobalContext);

  return (
    <div className={`${isCartOpen && "show-modal"} modal-overlay`}>
      <div className="cart-container text-center light-bg d-flex flex-column align-items-center  py-4">
        <i onClick={toggleCart} className="bi bi-x-lg"></i>
        {!cartItems.length ? (
          <p className="m-auto">Aún no se han agregado artículos</p>
        ) : (
          <>
            <CartList />
            <Link
              to={"/realizar-compra"}
              onClick={toggleCart}
              className="btn btn-success m-auto"
            >
              Realizar Compra
            </Link>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
