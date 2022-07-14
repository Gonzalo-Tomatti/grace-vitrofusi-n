import React, { useContext } from "react";
import { GLobalContext } from "../context";

const CartList = () => {
  const { cartItems, updateAmount } = useContext(GLobalContext);
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Ítem</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((i, index) => (
          <tr key={index}>
            <td>{i.code}</td>
            <td>${i.price}</td>
            <td>
              <i
                onClick={() => updateAmount(i.code, "dec")}
                className="bi bi-chevron-left"
              ></i>{" "}
              {i.amount}{" "}
              <i
                onClick={() => updateAmount(i.code, "inc")}
                className="bi bi-chevron-right"
              ></i>
            </td>
            <td>${i.price * i.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartList;
