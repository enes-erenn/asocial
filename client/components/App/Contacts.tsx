import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 1rem 0 0 1rem;
  padding: 1rem 1rem 0 1rem;
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
  margin: 10px 0;
`;

const ContactsLayout = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  overflow: auto;
  width: 100%;
`;

const Logout = styled.button`
  width: 100%;
  height: 2rem;
  background: transparent;
  color: white;
  border: none;
  border-top: 1px solid white;
  border-right: 1px solid white;
  border-left: 1px solid white;
  cursor: pointer;
  border-radius: 1rem 1rem 0 0;
`;

interface Props {
  contacts: Array<Object>;
  user: object;
  currentChat: object;
  setCurrentChat: React.SetStateAction<any>;
}

const Contacts: React.FC<Props> = ({
  contacts,
  currentChat,
  setCurrentChat,
}) => {
  const router = useRouter();

  const ContactWrapper = styled.div<{
    currentChat: any;
    contact: any;
  }>`
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
    }
  `;

  const changeCurrentChat = (contact: any) => {
    setCurrentChat(contact);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <Container>
      <ContactsLayout>
        <Logo>ASOCIAL</Logo>
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
      </ContactsLayout>
      <Logout onClick={handleLogout}>Logout</Logout>
    </Container>
  );
};

export default Contacts;
