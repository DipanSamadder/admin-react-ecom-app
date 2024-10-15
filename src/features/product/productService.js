import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

const getProducts = async () => {
  try {
    const response = await axios.get(`${base_url}product/`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

const addProduct = async (data) => {
  try {
    const response = await axios.post(`${base_url}product`, data, headerConfig);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

const getAProduct = async (id) => {
  try {
    const response = await axios.get(`${base_url}product/${id}`, headerConfig);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

const updateProduct = async (payload) => {
  try {
    const response = await axios.put(
      `${base_url}product/${payload._id}`,
      payload,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}product/${id}`,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

const productService = {
  getProducts,
  addProduct,
  getAProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
