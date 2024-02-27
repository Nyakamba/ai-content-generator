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
