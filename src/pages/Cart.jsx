import { CartContext } from "../utils/Context/CartContext";
import { useContext } from "react";
import React from "react";
import styled from "styled-components";

const CartWrapper = styled.div`
  max-width: 600px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.contactUs};
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
`;

const CartImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <CartWrapper>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <CartItem key={index}>
              <CartImage src={item.picture} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </CartItem>
          ))}
          {/* Add total or checkout button */}
        </>
      )}
    </CartWrapper>
  );
};

export default Cart;
