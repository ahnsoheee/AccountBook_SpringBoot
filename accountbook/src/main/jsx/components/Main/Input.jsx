import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Category from "./Category";
import Account from "./Account";
import { API } from "../../api/api";

const Input = ({ user, setLog, input, setInput }) => {
  const [categories, setCategories] = useState("");
  const [accounts, setAccounts] = useState("");

  useEffect(async () => {
    const categories = await API.post("/category", { "user_id": user, "type": "수입" });
    const accounts = await API.post("/account", { "user_id": user });
    setCategories(categories);
    setAccounts(accounts);
  }, []);

  const onClickIncome = async () => {
    setInput([true, false, input[2], input[3], input[4], input[5], input[6]]);
    const categories = await API.post("/category", { "user_id": user, "type": "수입" });
    setCategories(categories);
  };

  const onClickExpend = async () => {
    setInput([false, true, input[2], input[3], input[4], input[5], input[6]]);
    const categories = await API.post("/category", { "user_id": user, "type": "지출" });
    setCategories(categories);
  };

  const onChangeDate = (e) => {
    setInput([input[0], input[1], e.target.value, input[3], input[4], input[5], input[6]]);
  };

  const onClickCategory = (e) => {
    setInput([input[0], input[1], input[2], e.target.value, input[4], input[5], input[6]]);
  };

  const onClickAccount = (e) => {
    setInput([input[0], input[1], input[2], input[3], e.target.value, input[5], input[6]]);
  };

  const onChangeCost = (e) => {
    setInput([input[0], input[1], input[2], input[3], input[4], e.target.value, input[6]]);
  };

  const onChangeTitle = (e) => {
    setInput([input[0], input[1], input[2], input[3], input[4], input[5], e.target.value]);
  };

  const onClick = async () => {
    if (!input[2] || !input[3] || !input[4] || !input[5] || !input[6]) alert("모두 입력하세요");
    else {
      const result = await API.post("/log/add", {
        "user_id": user,
        "date": input[2],
        "category_id": input[3],
        "account_id": input[4],
        "cost": input[5],
        "title": input[6],
        "income": input[0],
      });
      if (result) {
        const logs = await API.post("/log", { "user_id": user });
        setLog(logs);
      }
    }
  };

  return (
    <Wrapper>
      <Item>
        <Name>분류</Name>
        <Type state={input[0]} onClick={onClickIncome}>
          수입
        </Type>
        <Type state={input[1]} onClick={onClickExpend}>
          지출
        </Type>
      </Item>
      <Items>
        <Div>
          <Name>날짜</Name>
          <Date type="date" onChange={onChangeDate} />
        </Div>
        <Div>
          <Name>카테고리</Name>
          <Category categories={categories} onClick={onClickCategory} />
        </Div>
        <Div>
          <Name>결제수단</Name>
          <Account accounts={accounts} onClick={onClickAccount} />
        </Div>
      </Items>
      <Items>
        <Div>
          <Name>금액</Name>
          <Content type="text" onChange={onChangeCost} />
        </Div>
        <Div>
          <Name>내용</Name>
          <Content type="text" onChange={onChangeTitle} />
        </Div>
      </Items>
      <Button onClick={onClick}>확인</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 600px;
`;

const Item = styled.div`
  display: flex;
  margin: 10px;
  font-size: 8pt;
`;

const Name = styled.div`
  font-size: 9pt;
  font-weight: bold;
  margin: 3px;
`;

const Type = styled.button`
  width: 50px;
  padding: 3px 0;
  margin-left: 10px;
  font-size: 9pt;
  color: ${(props) => (props.state ? "#ffffff" : "#ff4646")};
  background-color: ${(props) => (props.state ? "#ff4646" : "#ffffff")};
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid #cccccc;
  outline: none;
`;

const Items = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const Div = styled.div`
  display: flex;
  width: 200px;
  flex-grow: 1;
`;

const Date = styled.input`
  width: 140px;
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid #cccccc;
  background-color: #f8f1f1;
  outline: none;
`;

const Content = styled.input`
  width: 235px;
  text-align: center;
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid #cccccc;
  background-color: #f8f1f1;
  outline: none;
`;

const Button = styled.button`
  width: 600px;
  height: 30px;
  margin: 17px 0;
  background-color: #ff4646;
  text-align: center;
  color: #ffffff;
  border-radius: 6px;
  font-size: 10pt;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default Input;