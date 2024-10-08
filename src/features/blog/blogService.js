import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

export const getBlogs = async () => {
  try {
    const res = await axios.get(`${base_url}blog`);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
// Add a new brand
const createBlog = async (data) => {
  try {
    const response = await axios.post(`${base_url}blog`, data, headerConfig);
    console.log(response);

    return response.data; // Assuming response.data contains the added brand info
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

const blogServices = {
  getBlogs,
  createBlog,
};

export default blogServices;
