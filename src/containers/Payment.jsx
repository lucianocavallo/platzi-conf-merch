import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/Payment.css";
import AppContext from "../context/AppContext";
import { PayPalButton } from "react-paypal-button-v2";
import handleSumTotal from "../utils/handleSumTotal";
import pass from "../utils/pass";

const Payment = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const navigate = useNavigate();
  const sum = handleSumTotal(cart);

  const paypalOptions = {
    clientId: pass.paypalPaymentClientID,
    intent: 'capture',
    currency: 'USD',
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }

  const handlePaymentSuccess = (data) => {
    if(data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      navigate('/checkout/success');
    }
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map(item => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: "USD",
                    value: sum
                  }
                }],
              });
            }}
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={sum}
            onPaymentStart={() => console.log('Start payment')}
            onSuccess={data => handlePaymentSuccess(data)}
            onError={error => console.log(error)}
            onCancel={data => console.log(data)}
          />
        </div>
      </div>
      <div />
    </div>
  );
}

export default Payment;
