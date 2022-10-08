import { useEffect, useState } from "react";
import axios from "axios";

const useGetContacts = (id: string) => {
  const [contacts, setContacts] = useState<Object[]>([]);

  useEffect(() => {
    if (id) {
      (async function () {
        await axios
          .get(`http://localhost:5000/api/contacts/${id}`)
          .then((res) => setContacts(res.data.users));
      })();
    }
  }, [id]);

  return { contacts };
};

export default useGetContacts;
