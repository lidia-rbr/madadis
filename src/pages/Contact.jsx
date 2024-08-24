import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import emailjs from "emailjs-com";

const PageFormWrapper = styled.div`
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
`;

const FormContainer = styled.div`
  width: 60%;
  padding: 20px;
  // margin: 80px auto 80px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.cards};
  color: ${({ theme }) => theme.text};

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const FormButton = styled(Button)`
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.accent};
  text-decoration: none;
  border: none;
  padding: 0.6rem 2rem;
  margin-top: 1rem;
  display: inline-block;
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS configuration
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userID = process.env.REACT_APP_EMAILJS_USER_ID;

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        // Reset form after successful submission
        alert("Message sent");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      },
      (error) => {
        console.error("FAILED...", error);
      }
    );
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <PageFormWrapper>
      <FormContainer>
        <h2>Contact Us</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Your Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Your Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              type="textarea"
              name="message"
              id="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormButton type="submit">Submit</FormButton>
        </Form>
      </FormContainer>
    </PageFormWrapper>
  );
};

export default ContactForm;
