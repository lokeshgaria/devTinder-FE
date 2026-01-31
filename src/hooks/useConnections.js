import React, { useEffect, useState } from "react";
import AXIOS_API from "../utils/axios";
import { showError } from "../utils/notifications";
import { API_END_POINTS } from "../utils/constants";

const useConnections = () => {
  const [connectionList, setConnectionList] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const { data } = await AXIOS_API.get(`${API_END_POINTS.CONNECTION}/accepted`);
        if (data.success) {
          setConnectionList(data.data);
        }
      } catch (error) {
        console.log(error.message);
        showError(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);
console.log('connectionList',connectionList)
  return { connectionList, loading };
};

export default useConnections;
