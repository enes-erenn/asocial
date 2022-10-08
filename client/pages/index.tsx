import type { NextPage } from "next";

const Home: NextPage = () => {
  return <></>;
};

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
}

export default Home;
