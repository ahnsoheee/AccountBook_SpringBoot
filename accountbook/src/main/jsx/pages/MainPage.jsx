import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Common/Header";
import Signin from "../components/Sign/Signin";
import List from "../components/Main/List";
import Tab from "../components/Common/Tab";
import TabItem from "../components/Common/TabItem";
import Content from "../components/Main/Content";
import Input from "../components/Main/Input";
import { API } from "../api/api";

const MainPage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isAuth, setAuth] = useState(false);

  const [list, setList] = useState(true);
  const [cal, setCal] = useState(false);
  const [stat, setStat] = useState(false);

  const [logs, setLog] = useState("");

  // income, expend, date, category, account, cost, title
  const [input, setInput] = useState([true, false, "", "", "", "", ""]);

  useEffect(async () => {
    const user = await API.get("/user/auth");
    if (user) {
      setName(user.name);
      setId(user.user_id);
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [id, name, isAuth]);

  const onClickList = () => {
    setList(true);
    setCal(false);
    setStat(false);
  };

  const onClickCal = () => {
    setList(false);
    setCal(true);
    setStat(false);
  };

  const onClickStat = () => {
    setList(false);
    setCal(false);
    setStat(true);
  };

  return isAuth ? (
    <>
      <Header id={id} name={name}/>
      <>
        <Wrapper>
          <Tab>
            <TabItem name="내역" onClick={onClickList} state={list} />
            <TabItem name="달력" onClick={onClickCal} state={cal} />
            <TabItem name="통계" onClick={onClickStat} state={stat} />
          </Tab>
        </Wrapper>
        <Wrapper>
          {list ? (
            <Content>
              <Input user={id} setLog={setLog} input={input} setInput={setInput}></Input>
              <List user={id} logs={logs} setLog={setLog} input={input} />
            </Content>
          ) : cal ? (
            <Content>달력</Content>
          ) : (
            <Content>통계</Content>
          )}
        </Wrapper>
      </>
    </>
  ) : (
    <Signin />
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  background-color: #f8f1f1;
`;

export default MainPage;