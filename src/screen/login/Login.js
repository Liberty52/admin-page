import "./Login.css";
import Input from "../../component/common/Input";
import Checkbox from "../../component/common/Checkbox";
import Button from "../../component/common/Button";
import { post } from "../../axios/Login";
import { ACCESS_TOKEN } from "../../constants/token";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

function LoginInput() {
  return (
    <div className="inputs">
      <Input type="text" name="email" label="아이디" required={true} />
      <Input type="password" name="password" label="비밀번호" required={true} />
    </div>
  );
}

function LoginForm() {
  return (
    <form
      className="login-form"
      onSubmit={(event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const checked = event.target.checkbox.checked;
        const dto = {
          email: email,
          password: password,
          isAutoLogin: checked,
        };
        post(dto, checked);
      }}
    >
      <div className="login-title">로그인</div>
      <LoginInput />
      <Checkbox text="로그인 상태 유지" />
      <Button text="로그인" />
    </form>
  );
}

const LoginWrapper = styled.div`
  height: 95vh;
`;

export default function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_TOKEN) != null) {
      console.log(sessionStorage.getItem(ACCESS_TOKEN));
      navigate("/");
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <LoginWrapper>
          <div className="login">
            <div className="section">
              <div className="company-login">
                <LoginForm />
              </div>
            </div>
          </div>
        </LoginWrapper>
      )}
    </>
  );
}
