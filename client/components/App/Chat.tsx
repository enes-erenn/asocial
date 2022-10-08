import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #14213d;
  border-radius: 1rem;
`;

const CurrentChatInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  background-color: #ee9b00;
  padding: 6px 2rem;
  width: 100%;
`;

const CurrentChatUsername = styled.h2`
  color: white;
`;

interface Props {
  currentChat: {
    avatarImageURL: string;
    username: string;
  };
}

const Chat: React.FC<Props> = ({ currentChat }) => {
  return (
    <Container>
      <CurrentChatInfos>
        <Image
          width="50px"
          height="50px"
          alt="CurrentChat"
          src={`data:image/svg+xml;base64,${currentChat.avatarImageURL}`}
        />
        <CurrentChatUsername>{currentChat.username}</CurrentChatUsername>
      </CurrentChatInfos>
    </Container>
  );
};

export default Chat;
