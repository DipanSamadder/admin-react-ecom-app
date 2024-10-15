import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

//Get all Category
export const getProCates = async () => {
  try {
    const response = await axios.get(`${base_url}category`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

//Create new Category
export const createProCates = async (payload) => {
  try {
    const response = await axios.post(
      `${base_url}category`,
      payload,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

//Get A Category
export const getACategory = async (id) => {
  try {
    const response = await axios.get(`${base_url}category/${id}`, headerConfig);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

//Create new Category
export const updateProCates = async (payload) => {
  try {
    const response = await axios.put(
      `${base_url}category/${payload._id}`,
      payload,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

//Create new Category
export const deleteProCates = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}category/${id}`,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};
const proCatService = {
  getProCates,
  createProCates,
  getACategory,
  updateProCates,
  deleteProCates,
};

export default proCatService;
