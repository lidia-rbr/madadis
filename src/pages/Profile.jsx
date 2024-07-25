import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../utils/context/UserContext";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px auto auto auto;
  padding-top: 60px;
  align-items: center;
  padding: 20px;
  width: 60%;
  background: ${({ theme }) => theme.primary || "#f9f9f9"};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 128px;
  height: 128px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const UserName = styled.h2`
  margin: 0;
  font-size: 24px;
  color: ${({ theme }) => theme.text || "#333"};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const DetailItem = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: ${({ theme }) => theme.secondaryText || "#666"};
`;

const UserProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <ProfileWrapper>
      <ProfileImage
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
      <UserDetails>
        <DetailItem>@{user.username}</DetailItem>
        <DetailItem>{user.email}</DetailItem>
        <DetailItem>{user.gender}</DetailItem>
      </UserDetails>
    </ProfileWrapper>
  );
};

export default UserProfile;
