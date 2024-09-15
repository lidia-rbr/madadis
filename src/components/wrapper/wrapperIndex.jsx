import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  //   background: radial-gradient(
  //   circle,
  //   ${({ theme }) => theme.primary} 0%,
  //   ${({ theme }) => theme.secondary} 100%
  // );
`;

export { Wrapper, Content };
