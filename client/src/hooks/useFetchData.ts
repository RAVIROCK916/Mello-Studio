
import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";

const useFetchData = (url: string) => {
  const [data, setData] = useState([]);

  const fetchAPI = async () => {
    const data = await fetchData(url);
    setData(data);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return data;
};

export default useFetchData;
