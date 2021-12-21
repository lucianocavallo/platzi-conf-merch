import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/components/Success.css"

import Map from "../components/Map";

const Success = () => {
  const { state } = useContext(AppContext);
  const { buyer } = state;

  return (
    <div className="Success">
      <div className="Success-content">
        <h2>{`${buyer[0].name}, Gracias por tu compra`}</h2>
        <span>Tu pedido llegara en 3 dias a tu dirección</span>
        <div className="Success-map">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Success;
