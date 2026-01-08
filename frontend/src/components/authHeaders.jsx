import axios from "axios";

export const api = axios.create({
  baseURL: "https://react-python-app-production.up.railway.app",
});

export const authHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
