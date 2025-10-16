require("dotenv").config();

const app = require("express")();
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const axios = require("axios");

const PORT = process.env.PORT || 8080;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
});

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000,
  delayAfter: 5,
  delayMs: () => 500,
});

const user = {
  email: "olawaleade15@gmail.com",
  name: "Adedamola Olawale",
  stack: "Node.js/Express",
};

app.get("/me", limiter, speedLimiter, async (req, res) => {
  let catFact;

  try {
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });
    catFact = response.data.fact;
  } catch (error) {
    if (error.response) {
      console.log("Response", error.response);
      switch (error.response.status) {
        case 404:
          catFact = "Cat fact not found (404).";
          break;
        case 500:
          catFact = "Server error (500). Please try again later.";
          break;
        default:
          catFact = `Error: ${error.response.statusText} (${error.response.status})`;
      }
    } else if (error.request) {
      console.log("Request", error.request);
      catFact =
        "Request Timeout, This could be an error with your internet connection. Please check your connection and try again.";
    } else {
      console.log("Error", error.message);
      catFact = "Could not fetch cat fact at this time.";
    }
  }
  res.json({
    status: "success",
    user: user,
    timestamp: new Date().toISOString(),
    fact: catFact,
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
