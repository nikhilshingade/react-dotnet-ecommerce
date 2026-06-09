import api from "../api/axios";

const cartService = {
  getCart: async () => {
    const response = await api.get("/Cart");
    return response.data.data;
  },

  addToCart: async (data) => {
    await api.post("/Cart/add", data);
  },

  updateCartItem: async (data) => {
    await api.put("/Cart/update", data);
  },
};

export default cartService;