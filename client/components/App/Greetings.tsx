import React from "react";
import Image from "next/image";
import styled from "styled-components";
import astronot from "../../assets/gif/astronot.gif";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #14213d;
  border-radius: 1rem;
`;

const Message = styled.h3`
  color: white;
  margin: 0;
  text-align: center;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  text-align: center;
  span {
    margin: 0 6px;
    background: -webkit-linear-gradient(
      to right,
      #4a00e0,
      #8e2de2
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #4a00e0,
      #8e2de2
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    background: -webkit-linear-gradient(to right, #0f2027, #203a43, #2c5364);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const GreetingsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 2rem;
  border-radius: 2rem;
  transition: all ease-in 0.3s;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid lightgray;
  }
`;

interface Props {
  user: {
    username: string;
  };
}

const Greetings: React.FC<Props> = ({ user }) => {
  return (
    <Container>
      <Image width="300px" height="300px" alt="Greetings" src={astronot} />
      <GreetingsMessage>
        <Title>
          Welcome,<span>{user.username.toUpperCase()}!</span>
        </Title>
        <Message>Please select a contact to start chatting.</Message>
      </GreetingsMessage>
    </Container>
  );
};

export default Greetings;
