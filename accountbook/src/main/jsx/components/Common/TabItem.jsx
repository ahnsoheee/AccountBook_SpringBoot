import React from "react";
import styled from "styled-components";

const TabItem = ({ name, onClick, state }) => {
  return (
    <Item onClick={onClick} state={state}>
      {name}
    </Item>
  );
};

const Item = styled.button`
  width: 200px;
  text-align: center;
  font-weight: bold;
  border-radius: 15px;
  margin: 4px;
  border: none;
  color: ${(props) => (props.state ? "#ffffff" : "#000000")};
  background-color: ${(props) => (props.state ? "#ff4646" : "#ffffff")};
  outline: none;
  cursor: pointer;
`;

export default TabItem;