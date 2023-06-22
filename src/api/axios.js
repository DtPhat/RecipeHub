import axios from "axios";
const BASE_URL = 'https://recipehub.herokuapp.com/api/v1'
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

export const axiosGetAdminRecipes= async(pagination) => {

    const resp = await axios.get(BASE_URL + `/admin/recipes?page=${pagination.page}&size=${pagination.size}`, {headers: { 'Content-Type': 'application/json', 'JWT': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2ODcxNTM4NDAsImV4cCI6MTY4NzI0MDI0MH0.cvd-FdslOf6Xu10QGvd7Yi0VZNxZk9c4QrcJnkVxrvM' }})
    const data = resp.data
    return data;
}