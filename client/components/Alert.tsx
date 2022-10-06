import React from "react";
import styled from "styled-components";

const Container = styled.div<{ message: String }>`
  background: transparent;
  position: absolute;
  right: 2rem;
  bottom: 3rem;
  margin: auto;
  z-index: 9999;
  height: 2rem;
  animation-timing-function: ease-out;
  animation: alertAnimation 0.6s;

  ${(p) =>
    p.message
      ? `  @keyframes alertAnimation {
        from {
            right: 0;
        }
        to {
            right: 2rem;
        }
    }`
      : ""}
`;

const Wrapper = styled.div<{ status: String }>`
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  box-shadow: rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px,
    rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px,
    rgba(240, 46, 170, 0.05) 0px 25px;
  background-color: ${(p) => (p.status === "success" ? "green" : "#c9184a")};
`;

const Message = styled.p`
  padding: 1rem 3rem;
  color: white;
  font-weight: 500;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  message: String;
  status: String;
}

const Alert: React.FC<Props> = ({ message, status }) => {
  return (
    message && (
      <Container message={message}>
        <Wrapper status={status}>
          <Message>{message}</Message>
        </Wrapper>
      </Container>
    )
  );
};

export default Alert;
