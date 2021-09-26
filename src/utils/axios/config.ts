import axios from 'axios';
import { API_VERSION, DOMAIN, PROTOCOL } from '../constants';

export default axios.create({
  headers: {
    'x-api-token': process.env.X_API_TOKEN,
  },
  baseURL: getBaseAPIForEnvironment(process.env.ENVIRONMENT),
});

function getBaseAPIForEnvironment(environment: unknown) {
  switch (environment) {
    case 'STAGE':
      return PROTOCOL + `://stage` + DOMAIN + API_VERSION;
    default:
      throw new Error('Environment not available or not configured');
  }
}
