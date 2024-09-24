import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

// Fetch list of brands
const getBrands = async () => {
  try {
    const response = await axios.get(`${base_url}brand`);
    return response.data; // Assuming response.data contains the brands
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

// Add a new brand
const addBrand = async (data) => {
  try {
    const response = await axios.post(`${base_url}brand`, data, headerConfig);
    return response.data; // Assuming response.data contains the added brand info
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

// Export the service functions
const brandServices = {
  getBrands,
  addBrand,
};

export default brandServices;
