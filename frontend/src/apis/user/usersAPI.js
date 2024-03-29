import axios from "axios";
//Registration
export const registerAPI = async (userData) => {
  const response = await axios.post(
    "https://ai-content-generator.onrender.com/api/v1/users/register",
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
    "https://ai-content-generator.onrender.com/api/v1/users/login",
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
export const checkUserAuthStatusAPI = async () => {
  const response = await axios.get(
    "https://ai-content-generator.onrender.com/api/v1/users/auth/check",

    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//logout
export const logoutAPI = async () => {
  const response = await axios.post(
    "https://ai-content-generator.onrender.com/api/v1/users/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//user profile
export const getUserProfileApi = async () => {
  const response = await axios.get(
    "https://ai-content-generator.onrender.com/api/v1/users/profile",

    {
      withCredentials: true,
    }
  );
  return response?.data;
};
