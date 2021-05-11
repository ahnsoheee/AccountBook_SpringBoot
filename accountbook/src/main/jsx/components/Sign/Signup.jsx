import React, { useState, useCallback } from "react";
import SignButton from "./SignButton";
import Form from "./Form";
import Input from "./Input";
// import { API } from "../../api/api";
import Signin from "./Signin";

const Signup = () => {
  const [id, setId] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [isComplete, setComplete] = useState(false);

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePw1 = (e) => {
    setPw1(e.target.value);
  };

  const onChangePw2 = (e) => {
    setPw2(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onClick = async () => {
    if (!id.length || !pw1.length || !name.length) {
      alert("아이디와 비밀번호, 이름을 모두 입력하세요.");
    } else {
      if (pw1 !== pw2) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        // const res = await API.post("/user/signup", { id: id, pw: pw1, name: name });
        // if (res.result) {
        //   alert("회원가입이 성공적으로 완료되었습니다.");
        //   setComplete(true);
        // } else {
        //   alert("이미 존재하는 아이디입니다.");
        // }
      }
    }
  };

  return isComplete ? (
    <Signin />
  ) : (
    <>
      <Form title="회원가입">
        <Input type="text" name="name" placeholder="이름" value={name} onChange={onChangeName} required />
        <Input type="text" name="id" placeholder="아이디" value={id} onChange={onChangeId} required />
        <Input type="password" name="pw1" placeholder="비밀번호" value={pw1} onChange={onChangePw1} required />
        <Input type="password" name="pw2" placeholder="비밀번호 확인" value={pw2} onChange={onChangePw2} required />
        <SignButton name="회원가입" width="507px" height="40px" background="#ff4646" onClick={onClick} />
      </Form>
    </>
  );
};

export default Signup;