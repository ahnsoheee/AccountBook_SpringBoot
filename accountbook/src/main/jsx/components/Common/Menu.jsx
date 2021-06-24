import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SubMenu from "./SubMenu";
import CategorySetting from "./CategorySetting";
import AccountSetting from "./AccountSetting";
import { API } from "../../api/api";

const Menu = ({ id, name }) => {
  const [click, setClick] = useState(false);
  const [category, setCategory] = useState(false);
  const [account, setAccount] = useState(false);
  const [incomes, setIncomes] = useState("");
  const [expends, setExpends] = useState("");
  const [accounts, setAccounts] = useState("");

  useEffect(async () => {
    console.log(id)
    const incomes = await API.post("/category", { "user_id": id, "type": "수입" });
    const expends = await API.post("/category", { "user_id": id, "type": "지출" });
    const accounts = await API.post("/account", { "user_id": id });
    setIncomes(incomes);
    setExpends(expends);
    setAccounts(accounts);
  }, []);

  const onClick = () => {
    if (click) {
      setClick(false);
    } else {
      setClick(true);
    }
  };

  const onClickLogout = async () => {
    const result = await API.get("/user/logout");
    if (result) {
      location.href = "/";
    }
  };

  const onClickCategory = () => {
    setCategory(true);
  };

  const onClickAccount = () => {
    setAccount(true);
  };

  return click ? (
    <>
      <MenuButton onClick={onClick}>{name}님</MenuButton>
      <Wrapper>
        <SubMenu onClick={onClickLogout}>로그아웃</SubMenu>
        <SubMenu onClick={onClickCategory}>카테고리 관리</SubMenu>
        {category && (
          <CategorySetting
            user={id}
            setCategory={setCategory}
            incomes={incomes}
            expends={expends}
            setIncomes={setIncomes}
            setExpends={setExpends}
          />
        )}
        <SubMenu onClick={onClickAccount}>자산 관리</SubMenu>
        {account && <AccountSetting user={id} setAccount={setAccount} accounts={accounts} setAccounts={setAccounts} />}
      </Wrapper>
    </>
  ) : (
    <MenuButton onClick={onClick}>{name}님</MenuButton>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100px;
  padding: 7px;
  right: 20px;
  top: 40px;
  font-size: 12px;
  text-align: center;
  background-color: #ff4646;
  border: none;
  outline: none;
  color: #ffffff;
`;

const MenuButton = styled.button`
  width: 100px;
  font-size: 12px;
  text-align: center;
  background-color: #ff4646;
  cursor: pointer;
  border: none;
  outline: none;
  color: #ffffff;
`;

export default Menu;