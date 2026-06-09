import api from "../api/axios";

const authService = {
  login: async (data) => {
    const response = await api.post("/Auth/login",data);
    return response.data.data;
  },

  register: async (data) => {
    const response = await api.post("/Auth/register", data);
    return response.data.data;
  },
};

export default authService;