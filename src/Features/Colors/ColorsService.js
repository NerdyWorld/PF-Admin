import axios from "axios";
import { base_url } from "../../Utils/utilities";

const getAllColors = async () => {
  const response = await axios.get(`${base_url}/colors/get-all-colors`);
  return response.data;
};

const deleteColor = async (colorId) => {
  console.log(colorId);
  const response = await axios.delete(`${base_url}/colors/delete/${colorId}`);
  return response.data;
};

const createColor = async (newColor) => {
  const response = await axios.post(`${base_url}/colors/create`, newColor);

  return response.data;
};

export const colorsService = {
  getAllColors,
  deleteColor,
  createColor,
};
