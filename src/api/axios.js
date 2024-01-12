import axios from "axios";
// const BASE_URL = 'https://recipehub.herokuapp.com'
// const BASE_URL = 'https://recipehub.up.railway.app'
const BASE_URL = 'http://localhost:8080'
export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

export const axiosGoogle = (access_token) => axios.create({
  baseURL: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
  headers: { Authorization: `Bearer ${access_token}`, Accept: 'application/json' }
})
