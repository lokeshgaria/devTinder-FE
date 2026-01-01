import React, { useEffect, useState } from "react";
import AXIOS_API from "../utils/axios";
const useFeed = () => {
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const { data } = await AXIOS_API.get("/feed?page=1&limit=10");
        if (data.success) {
          setFeedList(data.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  
  return { feedList ,loading};
};

export default useFeed;
