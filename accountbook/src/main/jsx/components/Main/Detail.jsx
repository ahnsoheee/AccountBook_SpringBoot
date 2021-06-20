import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Category from "./Category";
import Account from "./Account";
import Modal from "../Common/Modal";
import { API } from "../../api/api";

const Detail = ({ user, content, setOpen, setLog }) => {
  // income, expend, id, date, category, account, cost, title
  const [input, setInput] = useState([
    content[0],
    content[1],
    content[2],
    content[3],
    content[4],
    content[5],
    content[6].substring(1),
    content[7],
  ]);

  const [categories, setCategories] = useState("");
  const [accounts, setAccounts] = useState("");

  useEffect(async () => {
    let categories;
    if (input[0]) {
      categories = await API.post("/category", { id: user, type: "수입" });
    } else {
      categories = await API.post("/category", { id: user, type: "지출" });
    }
    setCategories(categories);
    const accounts = await API.post("/account", { id: user });
    setAccounts(accounts);
  }, []);

  const onClickIncome = async () => {
    setInput([true, false, input[2], input[3], "", input[5], input[6], input[7]]);
    const categories = await API.post("/category", { id: user, type: "수입" });
    setCategories(categories);
  };

  const onClickExpend = async () => {
    setInput([false, true, input[2], input[3], "", input[5], input[6], input[7]]);
    const categories = await API.post("/category", { id: user, type: "지출" });
    setCategories(categories);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChangeDate = (e) => {
    setInput([input[0], input[1], input[2], e.target.value, input[4], input[5], input[6], input[7]]);
  };

  const onClickCategory = (e) => {
    setInput([input[0], input[1], input[2], input[3], e.target.value, input[5], input[6], input[7]]);
  };

  const onClickAccount = (e) => {
    setInput([input[0], input[1], input[2], input[3], input[4], e.target.value, input[6], input[7]]);
  };

  const onChangeCost = (e) => {
    setInput([input[0], input[1], input[2], input[3], input[4], input[5], e.target.value, input[7]]);
  };

  const onChangeTitle = (e) => {
    setInput([input[0], input[1], input[2], input[3], input[4], input[5], input[6], e.target.value]);
  };

  const onClickUpdate = async () => {
    if (!input[3] || !input[4] || !input[5] || !input[6] || !input[7]) alert("모두 입력하세요");
    else {
      const result = await API.post("/log/update", {
        id: input[2],
        date: input[3],
        category_id: input[4],
        account_id: input[5],
        cost: input[6],
        title: input[7],
        income: input[0],
      });
      if (result) {
        const logs = await API.post("/log", { id: user });
        setOpen(false);
        setLog(logs);
      }
    }
  };

  const onClickDelete = async () => {
    const result = await API.delete("/log/delete", {
      id: input[2],
      account_id: input[5],
      cost: input[6],
      income: input[0],
    });
    if (result) {
      const logs = await API.post("/log", { id: user });
      setOpen(false);
      setLog(logs);
    }
  };
  return (
    <Modal onClose={onClose}>
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
          <Date type="date" value={input[3]} onChange={onChangeDate} />
        </Div>
        <Div>
          <Name>카테고리</Name>
          <Category categories={categories} onClick={onClickCategory} defaultValue={input[4]} />
        </Div>
        <Div>
          <Name>결제수단</Name>
          <Account accounts={accounts} onClick={onClickAccount} defaultValue={input[5]} />
        </Div>
      </Items>
      <Items>
        <Div>
          <Name>금액</Name>
          <Input type="text" value={input[6]} onChange={onChangeCost} />
        </Div>
        <Div>
          <Name>내용</Name>
          <Input type="text" value={input[7]} onChange={onChangeTitle} />
        </Div>
      </Items>
      <Button backgroundColor={"#ff4646"} onClick={onClickUpdate}>
        수정
      </Button>
      <Button backgroundColor={"#ff9292"} onClick={onClickDelete}>
        삭제
      </Button>
    </Modal>
  );
};

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

const Input = styled.input`
  width: 235px;
  text-align: center;
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid #cccccc;
  background-color: #f8f1f1;
  outline: none;
`;

const Button = styled.button`
  width: 285px;
  height: 30px;
  margin: 10px 5px;
  background-color: ${(props) => props.backgroundColor};
  text-align: center;
  color: #ffffff;
  border-radius: 6px;
  font-size: 10pt;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default Detail;