import axios from "axios";
import { useState } from "react";
import { handleErrorRequest } from "./util";

axios.defaults.baseURL = "https://desolate-caverns-47468.herokuapp.com";
axios.defaults.timeout = 30000;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;

const getIpAddress = serialNo =>
  axios({
    method: "get",
    url: `/pax_device/${serialNo}`
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));

export const useGetIpAddress = serialNo => {
  const [isFetching, setIsFetching] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);
  const [error, setError] = useState(null);
  const fetchIpAddress = async () => {
    setIsFetching(true);
    const { response, error } = await getIpAddress(serialNo);
    setIsFetching(false);
    if (response) {
      setIpAddress(response.data);
    } else {
      setError(handleErrorRequest(error));
    }
  };
  return { isFetching, error, ipAddress, fetchIpAddress };
};
