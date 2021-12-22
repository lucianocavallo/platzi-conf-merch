import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/components/Success.css"
import useGoogleAddress from "../hooks/useGoogleAddress";

import Map from "../components/Map";

const Success = () => {
  const { state } = useContext(AppContext);
  const { buyer } = state;
  // const location = useGoogleAddress(buyer[0].address);
  const location = {
    lat: 40.74843124430164, lng: -73.9856567114413
  }

  return (
    <div className="Success">
      <div className="Success-content">
        <h2>{`${buyer[0].name}, Gracias por tu compra`}</h2>
        <span>Tu pedido llegara en 3 dias a tu dirección</span>
        <div className="Success-map">
          <Map data={location} />
        </div>
      </div>
    </div>
  );
}

export default Success;
