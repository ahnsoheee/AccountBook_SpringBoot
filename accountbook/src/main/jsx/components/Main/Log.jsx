import React from "react";
import styled from "styled-components";

const Log = ({ id, type, date, category_id, category, account_id, account, title, cost, setContent, setOpen }) => {
  const onClick = () => {
    if (type === "수입") {
      setContent([true, false, id, date, category_id, account_id, cost, title]);
    } else {
      setContent([false, true, id, date, category_id, account_id, cost, title]);
    }
    setOpen(true);
  };

  return (
    <>
      <Wrapper onClick={onClick}>
        <Category id={id} type={type}>
          {category}
        </Category>
        <Title>{title}</Title>
        <Account>{account}</Account>
        <Cost type={type}>{cost}원</Cost>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  border-top: 1px solid #cccccc;
  padding: 3px;
  &:hover {
    background: rgba(255, 70, 70, 0.3);
    cursor: pointer;
  }
`;

const Category = styled.div`
  width: 100px;
  background-color: ${(props) => (props.type == "수입" ? "#ff9292" : "#ff4646")};
  border-radius: 20px;
  color: #ffffff;
  font-size: 10pt;
  font-weight: bold;
  text-align: center;
  padding: 3px;
`;

const Title = styled.div`
  width: 280px;
  padding: 3px;
  font-size: 10pt;
  margin-left: 20px;
  font-weight: bold;
`;

const Account = styled.div`
  width: 80px;
  color: #727272;
  font-size: 10pt;
  font-weight: bold;
  padding: 3px;
`;

const Cost = styled.div`
  width: 80px;
  font-size: 10pt;
  font-weight: bold;
  text-align: center;
  padding: 3px;
  color: ${(props) => (props.type == "수입" ? "#ff9292" : "#ff4646")};
`;

export default Log;