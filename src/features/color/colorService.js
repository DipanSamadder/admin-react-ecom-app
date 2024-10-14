import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

export const getColors = async () => {
  try {
    const response = await axios.get(`${base_url}color`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const createColor = async (payload) => {
  try {
    const response = await axios.post(
      `${base_url}color`,
      payload,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const getAColor = async (id) => {
  try {
    const response = await axios.get(`${base_url}color/${id}`, headerConfig);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const updateColor = async (payload) => {
  try {
    const response = await axios.put(
      `${base_url}color/${payload._id}`,
      payload,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

const colorService = {
  getColors,
  createColor,
  getAColor,
  updateColor,
};

export default colorService;
