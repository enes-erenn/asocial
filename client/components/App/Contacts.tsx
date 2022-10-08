import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  border-radius: 1rem;
  padding: 1rem;
  gap: 10px;
  background-color: #03071e;
`;

const Logo = styled.h1`
  color: white;
  font-size: 3rem;
  margin: 10px auto;
  width: 100%;
  text-align: center;
`;

const Title = styled.h3`
  width: 100%;
  color: white;
`;

interface Props {
  contacts: Array<Object>;
  user: object;
}

const Contacts: React.FC<Props> = ({ contacts, user }) => {
  const [currentChat, setCurrentChat] = useState<object>({ _id: "" });

  const ContactWrapper = styled.div<{ currentChat: any; contact: any }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
    background-color: ${(p) =>
      p.currentChat?._id === p.contact?._id
        ? " rgb(255, 255, 255, 0.5);"
        : "rgb(255, 255, 255, 0.2)"};
    border-radius: 4px;
    padding: 6px;
    cursor: pointer;
    transition: all ease-out 0.2s;

    &:hover {
      background-color: rgb(255, 255, 255, 0.5);
      transform: scale(1.02);
    }
  `;

  const changeCurrentChat = (contact: any) => {
    setCurrentChat(contact);
  };

  return (
    <Container>
      <Logo>asocial</Logo>
      {contacts.length > 0 &&
        contacts?.map((contact: any, i) => (
          <ContactWrapper
            key={i}
            onClick={() => changeCurrentChat(contact)}
            contact={contact}
            currentChat={currentChat}
          >
            <Image
              src={`data:image/svg+xml;base64,${contact.avatarImageURL}`}
              alt="Avatar"
              width="64px"
              height="64px"
            />
            <Title>{contact.username}</Title>
          </ContactWrapper>
        ))}
    </Container>
  );
};

export default Contacts;
