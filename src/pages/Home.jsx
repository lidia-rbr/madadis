import styled from "styled-components";
import LastProductsSection from "../components/last-products/LastProducts";

const HomeBanner = styled.div`
  display: flex;
  align-items: center;
  height: 80vh;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );

  @media (max-width: 1024px) {
    height: 60vh;
  }
`;

const HomeTitle = styled.h1`
  position: absolute;
  color: ${({ theme }) => theme.accent};
  text-align: left;
  padding: 0%;
  margin-left: 5vw;
  margin-bottom: 4vh;
  font-size: 6vw;
  font-weight: bolder;
`;

function Home() {
  return (
    <>
      <HomeBanner>
        <HomeTitle>
          Welcome to
          <br />
          Madadis e-shop
        </HomeTitle>
        <div className="custom-shape-divider-bottom-1720480589">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </HomeBanner>
      <LastProductsSection />
    </>
  );
}

export default Home;
