import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GLobalContext } from "../context";
import { format } from "date-fns";

const Purchase = ({ p }) => {
  const { setCurrentPurchaseDetails } = useContext(GLobalContext);
  return (
    <tr>
      <td>{format(new Date(p.date), "dd/MM/yyyy '-' hh:mm:ss")}</td>
      <td>
        <Link
          to={"detalles"}
          onClick={() => setCurrentPurchaseDetails(p)}
          className="btn btn-success"
        >
          Ver Detalles
        </Link>
      </td>
    </tr>
  );
};

export default Purchase;
