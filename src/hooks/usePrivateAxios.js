import axios, { axiosPrivate } from "../components/api/axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth"
const useAxiosPrivate = () => {
  const { auth } = useAuth()
  useEffect(() => {
    const requestIntercept  = axiosPrivate.interceptors.request.use(
      config => {
        if(!config.headers['JWT']){
          config.headers['JWT'] =  `${auth?.user?.jwtToken}`;
        }
        return config
      }, (error) => Promise.reject(error)
    )
    // const responseIntercept = axiosPrivate.interceptors.response.use(
    //   response => response,
    //   async (error) => {
    //     const prevRequest = error?.config;
    //     if (error?.response?.status === 403 && !prevRequest?.sent) {
    //       preRequest.sent = true

    //     }
    //   }
    // )
    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept)
    }
  }, [auth]);
}

export default useAxiosPrivate