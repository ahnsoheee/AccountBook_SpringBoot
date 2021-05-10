import React from "react";
import styled from "styled-components";

const Form = ({ title, children }) => {
  return (
    <>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  margin-top: 120px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

export default Form;