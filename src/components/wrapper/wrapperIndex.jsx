import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures the body takes at least the height of the viewport */
  margin: 0;
`;

const Content = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export { Wrapper, Content };
