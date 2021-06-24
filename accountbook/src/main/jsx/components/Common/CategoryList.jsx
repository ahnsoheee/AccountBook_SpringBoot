import React, { useState } from "react";
import styled from "styled-components";
import { API } from "../../api/api";

const CategoryList = ({ id, name, user, setIncomes, setExpends }) => {
  const [state, setState] = useState(false);
  const [title, setTitle] = useState(name);

  const onUpdate = async () => {
    setState(true);
  };

  const onDelete = async () => {
    const result = await API.delete("/category", id );
    if (result) {
      const incomes = await API.post("/category", { "user_id": user, "type": "수입" });
      const expends = await API.post("/category", { "user_id": user, "type": "지출" });
      setIncomes(incomes);
      setExpends(expends);
    }
  };

  const onChangeName = (e) => {
    setTitle(e.target.value);
  };

  const onClick = async () => {
    const result = await API.post("/category/update", { "name": title, "id": id });
    if (result) {
      const incomes = await API.post("/category", { "user_id": user, "type": "수입" });
      const expends = await API.post("/category", { "user_id": user, "type": "지출" });
      setIncomes(incomes);
      setExpends(expends);
    }
    setState(false);
  };

  return state ? (
    <List>
      <NameInput type="text" placeholder={title} onChange={onChangeName} />
      <UpdateButton onClick={onClick}>확인</UpdateButton>
      <Blank />
    </List>
  ) : (
    <List>
      <Name>{name}</Name>
      <UpdateButton onClick={onUpdate}>수정</UpdateButton>
      <DeleteButton onClick={onDelete}>삭제</DeleteButton>
    </List>
  );
};

const List = styled.div`
  display: flex;
  margin: 5px;
  font-size: 11pt;
  font-weight: bold;
`;

const Name = styled.div`
  width: 370px;
  padding-left: 80px;
  color: #000000;
  text-align: left;
`;

const NameInput = styled.input`
  width: 369px;
  padding-left: 80px;
  color: #000000;
  text-align: left;
  outline: none;
  border: none;
  background-color: #f8f1f1;
`;

const UpdateButton = styled.button`
  width: 50px;
  outline: none;
  cursor: pointer;
  border: none;
  background-color: #ff4646;
  font-weight: bold;
  color: #ffffff;
`;

const DeleteButton = styled.button`
  width: 50px;
  outline: none;
  cursor: pointer;
  border: none;
  background-color: #ff9292;
  font-weight: bold;
  color: #ffffff;
  margin-left: 10px;
`;

const Blank = styled.div`
  width: 50px;
`;

export default CategoryList;