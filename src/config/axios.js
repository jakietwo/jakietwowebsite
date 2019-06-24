import axios from "axios";
import { message } from "ant-design-vue";

axios.defaults.baseURL = "http://127.0.0.1:7001";

export default axios;
axios.interceptors.response.use(response => {
  if (response.data.code === 400) {
    message.error("验证身份失败!");
  }
});
