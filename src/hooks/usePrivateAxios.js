import axios from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth"
const usePrivateAxios = () => {
  const { auth, logout } = useAuth()
  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      config => {
        if (!config.headers['JWT']) {
          config.headers['JWT'] = `${auth?.jwtToken}`;
        }
        return config
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = axios.interceptors.response.use(
      response => response,
      async (error) => {
        if (error?.response?.status === 403) {
          logout()
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    }
  }, [auth]);
  return axios
}

export default usePrivateAxios