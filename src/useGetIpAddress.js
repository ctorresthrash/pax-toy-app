import axios from "axios";
import { useState } from "react";
import { handleErrorRequest } from "./util";

axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = false;

const getIpAddress = serialNo => {
  return axios({
    method: "get",
    url: `https://desolate-caverns-47468.herokuapp.com/pax_device/${serialNo}`
  })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

export const useGetIpAddress = serialNo => {
  const [isFetching, setIsFetching] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);
  const [error, setError] = useState(null);
  const fetchIpAddress = () => {
    setIsFetching(true);
    return getIpAddress(serialNo).then(({ response, error }) => {
      setIsFetching(false);
      if (response) {
        setIpAddress(response.data);
      } else {
        setError(handleErrorRequest(error));
      }
    });
  };
  return { isFetching, error, ipAddress, fetchIpAddress };
};
