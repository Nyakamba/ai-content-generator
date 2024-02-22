const asyncHandler = require("express-async-handler");
const axios = require("axios");

//OpenAI Controller

const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    //send the ressponse
    const content = response?.data?.choices[0].text?.trim();
    console.log(content);
    res.status(200).json(content);
  } catch (error) {}
});

module.exports = openAIController;
