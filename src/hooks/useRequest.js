import React, { useEffect, useState } from "react";
import AXIOS_API from "../utils/axios";
import { showError, showSuccess } from "../utils/notifications";
import { API_END_POINTS } from "../utils/constants";
const useRequest = () => {
  const [requestList, setrequestList] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchConnection = async () => {
      try {
        setLoading(true);
        const { data } = await AXIOS_API.get(`${API_END_POINTS.CONNECTION}/pending`);
        if (data.success) {
          setrequestList(data.data);
        }
      } catch (error) {
        console.log(error.message);
        showError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConnection();
  }, []);

  ///request/review/:status/:requestId
  const handleRequestAction = async (actionPayload, fn, loadingFn) => {
    const { status, requestId } = actionPayload;
    try {
      setLoading(true);
//connections/review/accepted
      const { data } = await AXIOS_API.post(
        `${API_END_POINTS.CONNECTION}/review/${status}/${requestId}`
      );
      if (data.success) {
        showSuccess(data.message);
        fn((prev) => [...prev, requestId]);

        alert(data.message);
      }
    } catch (error) {
      alert(`"ERROR:" ${error.message}`);
      showError(error.message);
      console.error(("ERROR:", error.message));
    } finally {
      setLoading(false);
      loadingFn((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  return { requestList, loading, handleRequestAction };
};

export default useRequest;
