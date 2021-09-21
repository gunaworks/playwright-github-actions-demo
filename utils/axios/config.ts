import axios from 'axios';

export default axios.create({
  headers: {
    'x-api-token': process.env.X_API_TOKEN,
    // 'x-api-token': '1575f461e91cef9e7ee6bf31ea6ee22098b2d9bf',
  },
  baseURL: 'https://stage.lokalise.com/api2',
});
