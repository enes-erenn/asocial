import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import styled from "styled-components";
import useGetChat from "../../hooks/useGetChat";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 83% 6%;
  gap: 0.3rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
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

const Messages = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`;

const InputBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 8fr 2fr;
`;

const Input = styled.input`
  outline: none;
  height: 100%;
  border: none;
  padding: 0 6px;

  &::placeholder {
    padding: 0 6px;
  }
`;

const SendButton = styled.button`
  cursor: pointer;
  background-color: #03071e;
  color: white;
  border: none;
  border-radius: 0 0 1rem 0;
  height: 100%;
`;

interface Props {
  currentChat: {
    avatarImageURL: string;
    username: string;
    _id: string;
  };
  user: {
    _id: string;
  };
}

interface Chat {
  message?: string;
  fromSelf?: boolean;
}

const Chat: React.FC<Props> = ({ currentChat, user }) => {
  const [message, setMessage] = useState<string>("");
  const { chat } = useGetChat(user._id, currentChat._id);

  const handleSendMessage = async (): Promise<void> => {
    if (message.length) {
      await axios
        .post("http://localhost:5000/api/chat/add", {
          from: user._id,
          to: currentChat._id,
          message,
        })
        .then((res) => setMessage(""));
    }
  };

  const Content = styled.span<{ chat: any }>`
    max-width: 40%;
    overflow-wrap: break-word;
    padding: 1rem;
    font-size: 1.1rem;
    border-radius: 1rem;
    color: #d1d1d1;
    background-color: ${(p) => (p.chat.fromSelf ? "#4f04ff21" : "#4f04ff21")};
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      max-width: 70%;
    }
  `;

  const Message = styled.div<{ chat: any }>`
    display: flex;
    align-items: center;
    justify-content: ${(p) => (p.chat.fromSelf ? "flex-end" : "flex-start")};
  `;

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
      <Messages>
        {chat?.map((m: any) => (
          <div key={uuidv4()}>
            <Message chat={m}>
              <Content chat={m}>
                <span>
                  {m.message} {m.fromSelf}
                </span>
              </Content>
            </Message>
          </div>
        ))}
      </Messages>
      <InputBox>
        <Input
          type="text"
          placeholder="Type something.."
          value={message}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.code === "Enter") {
              handleSendMessage();
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
        ></Input>
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputBox>
    </Container>
  );
};

export default Chat;
