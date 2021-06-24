import React, { useState, useCallback } from "react";
import Input from "./Input";
import SignButton from "./SignButton";
import Form from "./Form";
import Signup from "./Signup";
import { API } from "../../api/api"

const Signin = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [signup, setSignup] = useState(false);

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  const onClick = async (e) => {
    if (!id.length || !pw.length) {
      alert("아이디와 비밀번호를 모두 입력하세요.");
    } else {
      const res = await API.post("/user/signin", { "user_id": id, "pw": pw });
      if (res) {
        location.href = "/main";
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    }
  };

  return signup ? (
    <Signup />
  ) : (
    <Form title="가계부">
      <Input type="text" name="id" placeholder="아이디" required onChange={onChangeId} />
      <Input type="password" name="pw" placeholder="비밀번호" required onChange={onChangePw} />
      <SignButton name="로그인" width="507px" height="40px" background="#ff4646" onClick={onClick} />
      <SignButton name="회원가입" width="507px" height="40px" background="#cccccc" onClick={() => setSignup(true)} />
    </Form>
  );
};

export default Signin;