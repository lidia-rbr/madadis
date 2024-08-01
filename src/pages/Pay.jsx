import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../utils/context/CartContext";
import { useNavigate } from "react-router-dom";

const PayWrapper = styled.div`
  margin-top: 60px;
  padding: 20px;
  display: flex;
  justify-content: center;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  min-height: 65vh;
`;

const PayForm = styled.form`
  width: 80%;
  max-width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.contactUs};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PayButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.accent};
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const TotalAmount = styled.p`
  font-size: 18px;
  margin-top: 10px;
  color: ${({ theme }) => theme.text};
`;

const Pay = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // Fake payment processing
    setTimeout(() => {
      setLoading(false);
      alert("Payment successful!");
      navigate("/thank-you");
      cart.forEach((index) => removeFromCart(index));
    }, 2000);
  };

  return (
    <PayWrapper>
      <PayForm onSubmit={handlePayment}>
        <h2>Payment</h2>
        <TotalAmount>Total Amount: ${totalAmount.toFixed(2)}</TotalAmount>
        <PayButton type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </PayButton>
      </PayForm>
    </PayWrapper>
  );
};

export default Pay;
