import axios from "axios";

const BASE_URL = "http://localhost:6969/api/";
const user = JSON.parse(localStorage.getItem("user"));
const TOKEN = user?.accessToken;

console.log('token', user);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
