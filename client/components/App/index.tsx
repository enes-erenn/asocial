import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGetContacts from "../../hooks/useGetContacts";
import Loader from "../Loader";
import Contacts from "./Contacts";
import Greetings from "./Greetings";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #001524;
`;

const Wrapper = styled.div`
  height: 85vh;
  width: 85%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: 1px solid gray;
  border-radius: 1rem;
`;

interface CurrentUser {
  _id?: string;
  username: string;
}

const AppPage = () => {
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState<CurrentUser>({ _id: "", username: "" });
  const { contacts } = useGetContacts(user._id || "");

  // Checking the if user there is
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      (async function () {
        const user: CurrentUser = await JSON.parse(
          localStorage.getItem("user") || ""
        );
        setUser(user);
      })();
      setIsUserAuthenticated(true);
    }
  }, []);

  return (
    <Container>
      {isUserAuthenticated ? (
        <Wrapper>
          <Contacts contacts={contacts} user={user} />
          <Greetings user={user} />
        </Wrapper>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default AppPage;
