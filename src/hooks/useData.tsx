import { useEffect, useState } from "react";

export function useData() {
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    const loadData = async () => {
      const url =
        "https://randomuser.me/api/?&page=2&results=50&seed=devdactic";
      const data = await fetch(url);
      const json = await data.json();
      setData(json.results);
    };
    loadData();
  }, []);

  const getUserByEmail = async (email: string) => {
    const url = "https://randomuser.me/api/?&page=2&results=50&seed=devdactic";
    const data = await fetch(url);
    const json = await data.json();

    const user = json.results.filter((item: any) => item.email === email);
    return user[0];
  };

  return { data, getUserByEmail };
}
