import axios from "axios";
import { base_url } from "../../utils/baseUrl.js";

const login = async (user) => {
  const { data } = await axios.post(`${base_url}user/admin-login`, user);
  return data;
};

const authService = {
  login,
};
export default authService;
