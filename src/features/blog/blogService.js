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

// Get a  Blog
const getABlog = async (id) => {
  try {
    const response = await axios.get(`${base_url}blog/${id}`, headerConfig);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Get a  Blog
const updateBlog = async (payload) => {
  try {
    const response = await axios.put(
      `${base_url}blog/${payload._id}`,
      payload,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Get a  Blog
const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${base_url}blog/${id}`, headerConfig);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

const blogServices = {
  getBlogs,
  createBlog,
  getABlog,
  updateBlog,
  deleteBlog,
};

export default blogServices;
