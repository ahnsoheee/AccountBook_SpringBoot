import React from "react";
import styled from "styled-components";

const Tab = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 600px;
  height: 35px;
  margin-top: 60px;
  display: flex;
  border: 1px solid #cccccc;
  border-radius: 15px;
  background-color: #ffffff;
`;

export default Tab;