import axios from "axios";
//Registration
export const registerAPI = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/users/register",
    {
      email: userData?.email,
      username: userData?.username,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//Login
export const loginAPI = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/users/login",
    {
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//chech auth
export const checkUserAuthStatusAPI = async (userData) => {
  const response = await axios.get(
    "http://localhost:5000/api/v1/users/auth/check",

    {
      withCredentials: true,
    }
  );
  return response?.data;
};
