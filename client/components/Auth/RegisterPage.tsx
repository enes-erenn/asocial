import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Alert from "../Alert";
import { useAlert } from "../../hooks/useAlert";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #001524;
`;

const Header = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  color: #000814;
`;

const LinkTitle = styled.span`
  color: #000814;
  font-weight: 600;
  cursor: pointer;
  transition: all ease-out 0.1s;
  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid #000814;
  }
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 3rem;
  border-radius: 12px;
  background-color: #eee;
  min-width: 24rem;
  min-height: 28rem;
  box-shadow: rgba(255, 255, 255, 0.15) 0px 48px 100px 0px;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem auto;
  width: 100%;
`;

const ListItem = styled.li`
  list-style: none;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid #ced4da;
  color: #000814;
  font-weight: 500;
  font-size: 1rem;
  width: 100%;
  transition: all ease-in 0.2s;

  &:focus {
    border-bottom: 1px solid #6c757d;
  }
`;

const Button = styled.button`
  background-color: #000814;
  color: white;
  width: 100%;
  border-radius: 1rem;
  height: 2.2rem;
  cursor: pointer;
  transition: all ease-in 0.2s;

  &:hover {
    background-color: #001214;
  }
`;

interface User {
  username: String;
  email: String;
  password: String;
  passwordConfirm: String;
}

const RegisterPage: React.FC = () => {
  const { message, status, showAlert } = useAlert();
  const router = useRouter();

  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // Setting the State
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Alert
  const setAlert = (message: string, status: string): void => {
    showAlert(message, status);
  };

  // Form Validation
  const handleValidate = () => {
    const { username, email, password, passwordConfirm } = user;
    if (!username.trim()) {
      setAlert("Please enter a username.", "fail");
      return false;
    }
    if (username.trim().length < 3) {
      setAlert("Please choose a longer username.", "fail");
      return false;
    }
    if (!email.trim()) {
      setAlert("Please enter an email.", "fail");
      return false;
    }
    if (!email.includes("@") || email.trim().length < 5) {
      setAlert("Please enter a valid email.", "fail");
      return false;
    }
    if (!password) {
      setAlert("Please enter a password.", "fail");
      return false;
    }
    if (password.length < 8) {
      setAlert(
        "Your password is not secure enough, please try to enter a longer password.",
        "fail"
      );
      return false;
    }
    if (!passwordConfirm) {
      setAlert("Please confirm your password.", "fail");
      return false;
    }
    if (password !== passwordConfirm) {
      setAlert("Passwords does not match!", "fail");
      return false;
    }
    return true;
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (handleValidate()) {
      const { username, email, password } = user;
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username,
            email,
            password,
          }
        );

        if (!data.status) {
          setAlert("Something went wrong. Please try again.", "fail");
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/avatar");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>
          <Title>Register</Title>
          <p>
            Have an account?{" "}
            <Link href="/login">
              <LinkTitle>Login</LinkTitle>
            </Link>
          </p>
        </Header>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <Input
              type="password"
              placeholder="Password Confirm"
              name="passwordConfirm"
              onChange={handleChange}
            />
          </ListItem>
        </List>
        <Button onClick={handleSubmit}>Register</Button>
      </Form>
      <Alert message={message} status={status} />
    </Container>
  );
};

export default RegisterPage;
