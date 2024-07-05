import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color:  ${({ theme }) => theme.contactUs};
`;

const FormButton = styled(Button)`
  color: white;
  text-decoration: none;
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
    // Handle form submission here, e.g., send data to backend or display a message
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
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
  );
};

export default ContactForm;
