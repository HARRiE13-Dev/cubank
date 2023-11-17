import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://cubank-services.vercel.app/api/v1/auth/";

const register = (user) => {
  return axios.post(API_URL + "register", user, { withCredentials: true });
};

const login = (accountId, password) => {
  return axios
    .post(
      API_URL + "login",
      {
        accountId,
        password,
      },
      { withCredentials: false }
    )
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios
    .post(API_URL + "logout", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getCurrentUser = () => {
  let data = localStorage.getItem("user");
  return JSON.parse(data);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
