import axios from "axios";
import { base_url } from "../../Utils/utilities";

const getAllProducts = async () => {
  const response = await axios(`${base_url}/products/get-all-products`);

  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(
    `${base_url}/products/delete/${productId}`
  );

  return response.data;
};

const createProduct = async (newProduct) => {
  console.log(newProduct);
  const response = await axios.post(`${base_url}/products/create`, newProduct);

  return response.data;
};

export const productService = {
  deleteProduct,
  getAllProducts,
  createProduct,
};
