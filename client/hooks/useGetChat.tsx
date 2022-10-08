import { useEffect, useState } from "react";
import axios from "axios";

const useGetChat = (userId: string, chatId: string) => {
  const [chat, setChat] = useState<Object[]>([]);

  useEffect(() => {
    if (userId && chatId) {
      (async function () {
        await axios
          .post(`http://localhost:5000/api/chat/get`, {
            from: userId,
            to: chatId,
          })
          .then((res) => setChat(res.data.chat));
      })();
    }
  }, [userId, chatId]);

  return { chat };
};

export default useGetChat;
