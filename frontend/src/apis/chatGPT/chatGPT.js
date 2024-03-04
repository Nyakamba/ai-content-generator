import axios from "axios";
//generate content
const generateContentAPI = async (prompt) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/openai/generate-content",
    {
      prompt,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

export default generateContentAPI;
