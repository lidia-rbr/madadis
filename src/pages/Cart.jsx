import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../utils/Context/CartContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/Context/UserContext";

const PageCartWrapper = styled.div`
  margin-top: 60px;
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  justify-content: center;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  min-height: 65vh;
`;

const CartWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.contactUs};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for better appearance */
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fff; /* Ensure the item has a background */
`;

const CartImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const DeleteButton = styled(Button)`
  color: white;
  text-decoration: none;
  margin-top: 1rem;
  display: inline-block;
  background-color: #57384a;
  border: none;
  &:hover {
    background-color: grey !important;
  }
`;

const CheckoutButton = styled(Button)`
  text-decoration: none;
  margin-top: 1rem;
  border: none;
  display: inline-block;
  background-color: ${({ theme }) => theme.accent};
  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const CartDetail = styled.div`
  flex: 1; /* Ensure it takes up remaining space */
  padding: 0 10px;
`;

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate("/payment");
    } else {
      navigate("/login?redirect=cart");
    }
  };

  return (
    <PageCartWrapper>
      <CartWrapper>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <CartItem key={index}>
                <CartImage src={item.picture} alt={item.title} />
                <CartDetail>
                  <p>{item.title}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </CartDetail>
                <DeleteButton onClick={() => removeFromCart(index)}>
                  Delete
                </DeleteButton>
              </CartItem>
            ))}
            <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
          </>
        )}
      </CartWrapper>
    </PageCartWrapper>
  );
};

export default Cart;
