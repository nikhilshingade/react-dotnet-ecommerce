import api from "../api/axios";

const orderService = {
  placeOrder: async () => {
    const response = await api.post("/Order/place");
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get("/Order/my-orders");
    return response.data.data;
  },
};

export default orderService;