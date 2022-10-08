import axios from "axios";
import { useEffect, useState } from "react";

const useGetContacts = (id: string) => {
  const [contacts, setContacts] = useState<Object[]>([]);
  console.log("contacts", contacts);
  console.log("id", id);

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
