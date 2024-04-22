import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  margin: 20px 10px 0 0;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  padding: 10px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  // const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleUser = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const history = useHistory();
  // console.log("user", user);

  const handleRegister = () => {
    try {
      publicRequest
        .post("auth/register", user)
        history.push('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          {/* <Input placeholder="First Name"></Input>
          <Input placeholder="Last Name"></Input> */}
          <Input
            placeholder="User Name"
            name="username"
            value={user.username}
            onChange={handleUser}
          ></Input>
          <Input
            placeholder="Email Id"
            name="email"
            value={user.email}
            onChange={handleUser}
          ></Input>
          <Input
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleUser}
          ></Input>
          <Input placeholder="Confirm Password"></Input>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
