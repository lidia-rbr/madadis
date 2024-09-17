import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { UserContext } from "../utils/context/UserContext";
import Loader from "../components/loader/loaderIndex";
import { useNavigate, useLocation } from "react-router-dom";

const PageFormWrapper = styled.div`
  margin-top: 60px;
  padding-top: 60px;
  padding-bottom: 60px;
  display: flex;
  flex:1;
  justify-content: center;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
`;

const FormContainer = styled.div`
  width: 60%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.cards};
  color: ${({ theme }) => theme.text};
  height: 32vh;
`;

const FormButton = styled(Button)`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.accent};
  text-decoration: none;
  border: none;
  padding: 0.6rem 2rem;
  margin-top: 1rem;
  display: inline-block;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const redirectPath = redirectParam ? `/${redirectParam}` : "/profile";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          expiresInMins: 30,
        }),
      });
      const userInfo = await response.json();
      if (!response.ok) {
        setError("Incorrect logins");
        return;
      }
      setUser(userInfo);
      navigate(redirectPath); // Redirect to the path based on the query parameter
    } catch (e) {
      setError("Error occurred during login");
    } finally {
      setLoading(false);
    }

    // Reset form
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <PageFormWrapper>
      <FormContainer>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormButton type="submit">Login</FormButton>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
          </>
        )}
      </FormContainer>
    </PageFormWrapper>
  );
};

export default LoginForm;
