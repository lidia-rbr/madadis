import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: none;
`;

const Spinner = styled.div`
  border: 8px solid ${({ theme }) => theme.loaderColor || '#f3f3f3'};
  border-top: 8px solid ${({ theme }) => theme.loaderAccentColor || '#3498db'};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
`;

function Loader() {
  return (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  );
}

export default Loader;
