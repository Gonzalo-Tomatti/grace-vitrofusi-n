import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GLobalContext } from "../context";
import Purchase from "../components/Purchase";

const History = () => {
  const { user } = useContext(GLobalContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://grace-vitrofusion.herokuapp.com/get-purchases/${user.email}`
      )
      .then((res) => {
        setHistory(res.data);
      });
  }, []);
  return (
    <div className="section p-3 text-center">
      <h4 className="mb-4">Historial de compras</h4>
      {!history.length ? (
        <h4 className="mt-5">No se han realizado compras aún.</h4>
      ) : (
        <table className="table">
          <tbody>
            {history.map((p, index) => (
              <Purchase key={index} p={p} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
