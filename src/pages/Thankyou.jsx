import React from "react";
import styled from "styled-components";

const PageMessageWrapper = styled.div`
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

const MessageWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.contactUs};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for better appearance */
`;

const ThankYou = () => {

  return (
    <PageMessageWrapper>
      <MessageWrapper>
        Thank you for your purchase!
      </MessageWrapper>
    </PageMessageWrapper>
  );
};

export default ThankYou;
