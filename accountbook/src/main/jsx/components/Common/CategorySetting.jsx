import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import CategoryList from "./CategoryList";
import { API } from "../../api/api";

const CategorySetting = ({ user, setCategory, incomes, expends, setIncomes, setExpends }) => {
  const [input, setInput] = useState([true, false, ""]);

  const onClose = () => {
    setCategory(false);
  };

  const income = incomes.map((income) => {
    return <CategoryList key={income.id} id={income.id} name={income.name} user={user} setIncomes={setIncomes} setExpends={setExpends} />;
  });

  const expend = expends.map((expend) => {
    return <CategoryList key={expend.id} id={expend.id} name={expend.name} user={user} setIncomes={setIncomes} setExpends={setExpends} />;
  });

  const onClickIncome = async () => {
    setInput([true, false, input[2]]);
  };

  const onClickExpend = async () => {
    setInput([false, true, input[2]]);
  };

  const onChangeName = (e) => {
    setInput([input[0], input[1], e.target.value]);
  };

  const onCreate = async () => {
    if (!input[2]) alert("카테고리 이름을 입력하세요.");
    const result = await API.post("/category/add", { "type": input[0] ? "수입" : "지출", "name": input[2], "user_id": user });
    if (result) {
      const incomes = await API.post("/category", { "user_id": user, "type": "수입" });
      const expends = await API.post("/category", { "user_id": user, "type": "지출" });
      setIncomes(incomes);
      setExpends(expends);
    } else {
      alert("이미 존재하는 카테고리입니다.");
    }
  };

  return (
    <Modal title="카테고리 관리" onClose={onClose}>
      <InputDiv>
        <TypeInput state={input[0]} onClick={onClickIncome}>
          수입
        </TypeInput>
        <TypeInput state={input[1]} onClick={onClickExpend}>
          지출
        </TypeInput>
        <Input type="text" onChange={onChangeName} />
        <Button onClick={onCreate}>+</Button>
      </InputDiv>
      <Type backgroundColor="#ff9292">수입</Type>
      {income}
      <Type backgroundColor="#ff4646">지출</Type>
      {expend}
    </Modal>
  );
};

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const TypeInput = styled.button`
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

const Input = styled.input`
  width: 200px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #cccccc;
  background-color: #f8f1f1;
  outline: none;
  margin-left: 20px;
`;

const Button = styled.button`
  font-size: 15pt;
  cursor: pointer;
  color: #ff4646;
  outline: none;
  border: none;
  background-color: #f8f1f1;
`;

const Type = styled.div`
  width: 80px;
  margin: 30px 0 20px 20px;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 11pt;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 20px;
`;

export default CategorySetting;