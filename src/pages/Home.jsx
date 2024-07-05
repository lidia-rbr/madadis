import styled from "styled-components";
// import homepage from "../assets/homepage.jpg";
import LastProductSection from "../components/lastProducts/LastProducts";

const HomeBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const HomeTitle = styled.h1`
position: absolute;
    color: ${({ theme }) => theme.mainTitleColor};
    text-align: center;
    padding: 0%;
    font-size: 60px;
    font-weight: bolder;
`;

function Home() {
  return (
    <>
      <HomeBanner>
        <HomeTitle>Welcome to<br />Madadis e-shop</HomeTitle>
      </HomeBanner>
      <LastProductSection />
    </>
  );
}

export default Home;
