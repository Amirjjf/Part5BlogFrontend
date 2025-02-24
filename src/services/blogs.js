import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// ✅ New: Update likes using PUT request
const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

export default { getAll, create, update, setToken };
