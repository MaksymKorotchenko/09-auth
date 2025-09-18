import axios from 'axios';

export const baseURL = () => {
  return process.env.NEXT_PUBLIC_API_URL;
};

export const nextServer = axios.create({
  baseURL: `${baseURL()}/api`,
  withCredentials: true,
});
