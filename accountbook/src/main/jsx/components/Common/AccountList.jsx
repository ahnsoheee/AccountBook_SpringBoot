import React, { useState } from "react";
import styled from "styled-components";
import { API } from "../../api/api";

const AccountList = ({ id, name, asset, user, setAccounts }) => {
  const [state, setState] = useState(false);
  const [title, setTitle] = useState(name);
  const [cost, setCost] = useState(asset);

  const onUpdate = async () => {
    setState(true);
  };

  const onDelete = async () => {
    const result = await API.delete("/account", id );
    if (result) {
      const accounts = await API.post("/account", { "user_id": user });
      setAccounts(accounts);
    }
  };

  const onChangeName = (e) => {
    setTitle(e.target.value);
  };

  const onChangeAsset = (e) => {
    setCost(e.target.value);
  };

  const onClick = async () => {
    if (isNaN(cost)) alert("숫자만 입력해주세요.");
    else {
      const result = await API.post("/account/update", { "name": title, "asset": cost, "id": id });
      if (result) {
        const accounts = await API.post("/account", { "user_id": user });
        setAccounts(accounts);
      }
      setState(false);
    }
  };

  return state ? (
    <List>
      <NameInput type="text" placeholder={title} onChange={onChangeName} />
      <AssetInput type="text" placeholder={cost} onChange={onChangeAsset} />
      <UpdateButton onClick={onClick}>확인</UpdateButton>
      <Blank />
    </List>
  ) : (
    <List>
      <Name>{title}</Name>
      <Asset>{cost}원</Asset>
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
  justify-content: center;
`;

const Name = styled.div`
  width: 230px;
  color: #000000;
  margin-left: 30px;
  text-align: left;
`;

const NameInput = styled.input`
  width: 227px;
  color: #000000;
  text-align: left;
  margin-left: 20px;
  outline: none;
  border: none;
  background-color: #f8f1f1;
`;

const AssetInput = styled.input`
  width: 146px;
  color: #000000;
  text-align: left;
  outline: none;
  border: none;
  background-color: #f8f1f1;
`;

const Asset = styled.div`
  width: 150px;
  color: #000000;
  text-align: left;
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

export default AccountList;