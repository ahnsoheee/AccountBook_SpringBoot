import React from "react";
import styled from "styled-components";

const Account = ({ accounts, onClick, defaultValue }) => {
  if (accounts) {
    const account = accounts.map((account) => {
      return defaultValue ? (
        <option value={account.id} key={account.id} selected>
          {account.name}
        </option>
      ) : (
        <option value={account.id} key={account.id}>
          {account.name}
        </option>
      );
    });
    return (
      <Select onClick={onClick}>
        <option value="none">선택하세요</option>
        {account}
      </Select>
    );
  }
  return <Select />;
};

const Select = styled.select`
  width: 120px;
  margin-left: 10px;
  border: none;
  border-bottom: 1px solid #cccccc;
  background-color: #f8f1f1;
  outline: none;
`;

export default Account;