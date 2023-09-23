import axios from "axios";
import { base_url } from "../../Utils/utilities";

const loginUser = async (user) => {
  const response = await axios.post(`${base_url}/user/login`, user);

  return response.data;
};

const googleLogin = async (googleUser) => {
  const response = await axios.post(`${base_url}/user/googleAuth`, googleUser);

  return response.data;
};

const githubAuth = async (gitCode) => {
  const response = await axios.post(`${base_url}/user/githubAuth/${gitCode}`);

  return response.data;
};
const getAllUsers = async () => {
  const response = await axios(`${base_url}/user/get-all-users`);

  return response.data;
};

const getUser = async (userId) => {
  const response = await axios.post(`${base_url}/user/get-users`, { userId });

  return response.data;
};

const updateUser = async (data) => {
  const response = await axios.put(
    `${base_url}/user/update/${data.userId}`,
    data.data
  );

  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${base_url}/user/delete/${userId}`);

  return response.data;
};

export const userService = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  googleLogin,
  githubAuth,
};
