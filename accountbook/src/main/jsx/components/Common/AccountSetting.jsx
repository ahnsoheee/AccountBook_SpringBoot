import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import AccountList from "./AccountList";
import { API } from "../../api/api";

const AccountSetting = ({ user, setAccount, accounts, setAccounts }) => {
  const [input, setInput] = useState(["", ""]);

  const onClose = () => {
    setAccount(false);
  };

  const account = accounts.map((account) => {
    return <AccountList key={account.id} id={account.id} name={account.name} asset={account.asset} user={user} setAccounts={setAccounts} />;
  });

  const onChangeName = (e) => {
    setInput([e.target.value, input[1]]);
  };

  const onChangeAsset = (e) => {
    setInput([input[0], e.target.value]);
  };

  const onCreate = async () => {
    if (!input[0] || !input[1]) alert("자산의 이름과 금액을 모두 입력하세요.");
    if (isNaN(input[1])) alert("금액에 숫자를 입력하세요.");
    else {
      const result = await API.post("/account/add", { "name": input[0], "asset": input[1], "user_id": user });
      if (result) {
        const accounts = await API.post("/account", { "user_id": user });
        setAccounts(accounts);
      } else {
        alert("이미 존재하는 자산 이름입니다.");
      }
    }
  };

  return (
    <Modal title="자산 관리" onClose={onClose}>
      <InputDiv>
        <Name>이름</Name>
        <Input type="text" onChange={onChangeName} />
        <Name>금액</Name>
        <Input type="text" onChange={onChangeAsset} />
        <Button onClick={onCreate}>+</Button>
      </InputDiv>
      {account}
    </Modal>
  );
};

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const Name = styled.div`
  font-size: 9pt;
  font-weight: bold;
  margin: 3px;
  color: #000000;
  margin-left: 20px;
`;

const Input = styled.input`
  width: 200px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #cccccc;
  background-color: #f8f1f1;
  outline: none;
`;

const Button = styled.button`
  font-size: 15pt;
  cursor: pointer;
  color: #ff4646;
  outline: none;
  border: none;
  background-color: #f8f1f1;
`;

export default AccountSetting;