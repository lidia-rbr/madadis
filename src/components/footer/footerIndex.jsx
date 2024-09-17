import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground};
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  bottom:0px;
  width: 100%;
  // z-index:1000;
  // height:20vh

`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 1rem;
`;

const FooterTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

// const FooterLink = styled(Link)`
//   color: ${({ theme }) => theme.footerLink};
//   text-decoration: none;
//   margin-bottom: 0.5rem;
//   display: block;

//   &:hover {
//     color: ${({ theme }) => theme.footerLinkHover};
//   }
// `;

const SocialMediaLink = styled.a`
  color: ${({ theme }) => theme.footerLink};
  margin-right: 1rem;
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.footerLinkHover};
  }
`;

const FooterText = styled.p`
  font-size: 0.7rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterTitle>About Us</FooterTitle>
        <FooterText>
          Learn more about our mission, vision, and values.
        </FooterText>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Contact Us</FooterTitle>
        <FooterText>Email: info@madadise-shop.com</FooterText>
        <FooterText>Phone: +123 456 7890</FooterText>
        <FooterText>Address: 123 Main St, City, Country</FooterText>
      </FooterSection>
      <FooterSection>
        <FooterTitle>Follow Us</FooterTitle>
        <SocialMediaLink
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-f"></i>
        </SocialMediaLink>
        <SocialMediaLink
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter"></i>
        </SocialMediaLink>
        <SocialMediaLink
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </SocialMediaLink>
      </FooterSection>
    </FooterContainer>
  );
}

export default Footer;
