import React from "react";
import styled from "styled-components";

const SubmitButton = ({ name, width, height, background, onClick }) => {
  return (
    <Submit width={width} height={height} background={background} onClick={onClick}>
      {name}
    </Submit>
  );
};

const Submit = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-weight: bold;
  background-color: ${(props) => props.background};
  cursor: pointer;
  outline: none;
`;

export default SubmitButton;