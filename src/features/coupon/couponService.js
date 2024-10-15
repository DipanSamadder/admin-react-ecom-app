import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

export const getCoupon = async () => {
  try {
    const response = await axios.get(`${base_url}coupon`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Add a new brand
const createCoupon = async (data) => {
  try {
    const response = await axios.post(`${base_url}coupon`, data, headerConfig);
    console.log(response);

    return response.data; // Assuming response.data contains the added brand info
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};

// get a coupon
const getACoupon = async (id) => {
  try {
    const response = await axios.get(`${base_url}coupon/${id}`, headerConfig);
    console.log(response);

    return response.data; // Assuming response.data contains the added brand info
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};
// update coupon
const updateCoupon = async (payload) => {
  try {
    const response = await axios.put(
      `${base_url}coupon/${payload._id}`,
      payload,
      headerConfig
    );
    console.log(response);

    return response.data; // Assuming response.data contains the added brand info
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};
// delete coupon
const deleteCoupon = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}coupon/${id}`,
      headerConfig
    );

    return response.data; // Assuming response.data contains the added brand info
  } catch (error) {
    throw error.response?.data?.message || error.message; // Proper error throwing for catch block in thunk
  }
};
const couponService = {
  getCoupon,
  createCoupon,
  getACoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
