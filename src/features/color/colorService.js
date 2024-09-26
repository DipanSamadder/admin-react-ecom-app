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

const colorService = {
  getColors,
  createColor,
};

export default colorService;
