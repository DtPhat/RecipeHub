import axios from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth"
const useAxiosPrivate = () => {
  const { auth } = useAuth()
  useEffect(() => {
    const requestIntercept  = axios.interceptors.request.use(
      config => {
        if(!config.headers['JWT']){
          config.headers['JWT'] =  `${auth?.jwtToken}`;
        }
        return config
      }, (error) => Promise.reject(error)
    )
    return () => {
      axios.interceptors.response.eject(requestIntercept)
    }
  }, [auth]);
  return axios
}

export default useAxiosPrivate