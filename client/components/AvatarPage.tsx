import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { useAlert } from "../hooks/useAlert";
import useGetAvatars from "../hooks/useGetAvatars";
import Alert from "./Alert";
import Loader from "./Loader";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #001524;
  gap: 2rem;
`;

const Avatars = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: lightgray;
  padding: 3rem;
  border-radius: 2rem;
`;

const Title = styled.h1`
  color: white;
`;

const Button = styled.button`
  padding: 1rem 3rem;
  background-color: #ca6702;
  border: 1px solid lightgray;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  transition: all ease 0.1s;

  &:hover {
    transform: scale(1.03);
    background-color: #bb3e03;
  }
`;

const AvatarPage: React.FC = () => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<String>("");
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const { avatars, isReady } = useGetAvatars();
  const { message, status, showAlert } = useAlert();

  const ImageWrapper = styled.div<{ avatar: String }>`
    background-color: ${(p) =>
      p.avatar === selectedAvatar ? "#000814" : "#e5e5e5"};
    display: flex;
    transform: ${(p) =>
      p.avatar === selectedAvatar ? "scale(1.2)" : "scale(1)"};
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 10px;
    cursor: pointer;
  `;

  // Alert
  const setAlert = (message: string, status: string): void => {
    showAlert(message, status);
  };

  const handleProfilePicture = async (): Promise<void> => {
    // If avatar is not selected
    if (!selectedAvatar) {
      setAlert("Please select an avatar.", "fail");
    }
    // If avatar is selected
    else {
      // Get user form the local storage
      const user = await JSON.parse(localStorage.getItem("user") || "");

      // Make request to set avatar
      const { data } = await axios.post(
        `http://localhost:5000/api/avatar/${user.id}`,
        {
          image: selectedAvatar,
        }
      );

      // If response is successful
      if (data.status) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/app");
      }
      // If response is not successful
      else {
        setAlert(data.message, data.status);
      }
    }
  };

  // Checking the if user there is
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      setIsUserAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isUserAuthenticated ? (
        <Container>
          <Title>Pick an avatar as your profile picture</Title>
          {isReady ? (
            <>
              <Avatars>
                {avatars.map((a) => (
                  <ImageWrapper
                    key={`data:image/svg+xml;base64,${a}`}
                    avatar={a}
                    onClick={() => setSelectedAvatar(a)}
                  >
                    <Image
                      width="64"
                      height="64"
                      alt="Avatar"
                      src={`data:image/svg+xml;base64,${a}`}
                    />
                  </ImageWrapper>
                ))}
              </Avatars>
              <Button onClick={handleProfilePicture}>
                SET AS PROFILE PICTURE
              </Button>
            </>
          ) : (
            <Loader />
          )}
          <Alert message={message} status={status} />
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AvatarPage;
