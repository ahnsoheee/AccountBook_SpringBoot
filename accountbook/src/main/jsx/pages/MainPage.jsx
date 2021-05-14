import React, { useState, useEffect } from 'react';
import Header from '../components/Common/Header';
import styled from "styled-components";
import Signin from "../components/Sign/Signin";

const MainPage = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [isAuth, setAuth] = useState(false);
    
    useEffect(async () => {
        const user = await API.get("/user/auth");
        if (user) {
          setName(user.name);
          setId(user.id);
          setAuth(true);
        } else {
          setAuth(false);
        }
      }, [id, name, isAuth]);

      
    return isAuth ? (
        <>
        <Header id={id} name={name}/>
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