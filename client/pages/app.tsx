import React from "react";
import Head from "next/head";
import AppPage from "../components/App";

const App: React.FC = () => {
  return (
    <>
      <Head>
        <title>ASOCIAL | Realtime Chat App</title>
      </Head>
      <AppPage />
    </>
  );
};

export default App;
