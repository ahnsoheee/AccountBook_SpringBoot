import React from "react";
import styled from "styled-components";

const Content = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  background-color: #f8f1f1;
`;

export default Content;