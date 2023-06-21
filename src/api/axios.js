import axios from "axios";
const BASE_URL = 'https://recipehub.herokuapp.com'
export default axios.create({
  baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

export const axiosGoogle = (access_token) => axios.create({
  baseURL: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
  headers: { Authorization: `Bearer ${access_token}`, Accept: 'application/json' }
})
