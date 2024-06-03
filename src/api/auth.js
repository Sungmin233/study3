import axios from 'axios';

let token = null;

export const setToken = (newToken) => {
  if (newToken) {
    token = newToken;
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  } else {
    token = null;
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getToken = () => token;
