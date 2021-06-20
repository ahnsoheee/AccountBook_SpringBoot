import React from "react";
import styled from "styled-components";

const SubMenu = ({ onClick, children }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

const Button = styled.button`
  height: 30px;
  font-size: 12px;
  text-align: center;
  background-color: #ff4646;
  cursor: pointer;
  border: none;
  outline: none;
  color: #ffffff;
`;

export default SubMenu;