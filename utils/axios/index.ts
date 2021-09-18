import axios from "axios";

export default axios.create({
  headers: {
    "x-api-token": process.env.X_API_TOKEN,
  },
  baseURL: "https://stage.lokalise.com/api2",
});
