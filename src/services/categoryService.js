
import api from "../api/axios";

const categoryService = {
  getAll: async () => {
    const response = await api.get("/Category");
    return response.data.data;
  },
};

export default categoryService;