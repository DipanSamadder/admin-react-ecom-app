import axios from "axios";
import { base_url } from "../../utils/base_url";
import { headerConfig } from "../../utils/headerConfig";

export const getOrders = async () => {
  const res = await axios.get(`${base_url}user/getallorders`, headerConfig);
  return res.data;
};

const orderServices = {
  getOrders,
};

export default orderServices;
