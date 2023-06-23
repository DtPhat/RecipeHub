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

export const axiosGetAdminRecipes= async(filter) => {

    const resp = await axios.get(BASE_URL + `/admin/recipes?page=${filter.page - 1}&size=${filter.size}&sort=${filter.sort}&direction=${filter.direction}&query=${filter.query}`, {headers: { 'Content-Type': 'application/json', 'JWT': 
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2ODc0MTk2NDcsImV4cCI6MTY4ODI4MzY0N30.3ewRu46ursifgYieGbvFmDsRaZhffDxKgh8TC9xPa4I" }})
    const data = {
      data: resp.data.recipes,
      totalItem: resp.data.totalItem
    }
    return data;
}

export const axiosGetAdminUsers = async(filter) => {

  const resp = await axios.get(BASE_URL + `/admin/users?page=${filter.page - 1}&size=${filter.size}&sort=${filter.sort}&direction=${filter.direction}&query=${filter.query}`, {headers: { 'Content-Type': 'application/json', 'JWT': 
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2ODc0MTk2NDcsImV4cCI6MTY4ODI4MzY0N30.3ewRu46ursifgYieGbvFmDsRaZhffDxKgh8TC9xPa4I" }})
  const data = {
    data: resp.data.users,
    totalItem: resp.data.totalItem
  }
  return data;
}