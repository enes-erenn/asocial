import { useEffect, useState } from "react";
import axios from "axios";

const useGetAvatars = () => {
  const [avatars, setAvatars] = useState<String[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const avatarArray: Array<String> = [];
    // A function that fetchs the avatars from the api dynamically.
    const getAvatars = async (order: number): Promise<void> => {
      let avatar = { data: "" };
      avatar = await axios.get(
        `https://api.multiavatar.com/45678945/${Math.round(
          Math.random() + order * 1000
        )}?apikey=${process.env.NEXT_PUBLIC_MULTI_AVATAR_API_KEY}`
      );
      if (avatar.data) {
        const buffer = new Buffer(avatar.data).toString("base64");
        avatarArray.push(buffer);
        if (order === 4) {
          setAvatars(avatarArray);
        }
      }
    };
    for (let i = 1; i <= 4; i++) {
      getAvatars(i);
    }
  }, []);

  useEffect(() => {
    if (avatars.length === 4) {
      setIsReady(true);
    }
  }, [avatars.length]);

  return { avatars, isReady };
};

export default useGetAvatars;
