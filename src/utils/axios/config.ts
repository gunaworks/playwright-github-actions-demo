import axios from 'axios';
import {API_VERSION} from "../constants";

export default axios.create({
  headers: {
    'x-api-token': process.env.X_API_TOKEN,
  },
  baseURL: process.env.BASE_URL+API_VERSION
});
