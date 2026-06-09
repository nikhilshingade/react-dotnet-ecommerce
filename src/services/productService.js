import api from "../api/axios";

const productService = {
  getAll: async () => {
    const response = await api.get("/Product");
    return response.data.data;
  },

  getById: async (id) => {
    const response = await api.get(`/Product/${id}`);
    return response.data.data;
  },

  getPaged: async (params) => {
    const response = await api.get("/Product/paged", {
      params,
    });

    return response.data.data;
  },
  getPaged: async (params) => {
    const response = await api.get(
        "/Product/paged",
        { params }
    );

    return response.data.data;
   },
  
  create: async (data) => {
    const response = await api.post(
      "/Product",
      data
    );

    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(
      `/Product/${id}`,
      data
    );

    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(
      `/Product/${id}`
    );

    return response.data;
  },
};

export default productService;