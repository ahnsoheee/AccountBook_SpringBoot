import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Title>가계부</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 30px;
  padding-top: 10px;
  background-color: #ff4646;
`;

const Title = styled.div`
  width: 90%;
  padding-left: 100px;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  color: #ffffff;
`;

export default Header;