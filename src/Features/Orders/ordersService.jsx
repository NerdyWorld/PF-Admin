import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/orders', // Configura la URL base aquí
  });


const getAllOrders = async () => {
  try {
    const response = await instance.get('/get-all-orders');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error de respuesta del servidor:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al realizar la solicitud:', error.message);
    }
  }
};


const updateOrder = async(orderData) =>{
    try {
        const response = await instance.put('/update', orderData);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error('Error de respuesta del servidor:', error.response.data);
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
        } else {
          console.error('Error al realizar la solicitud:', error.message);
        }
    }
};

const createOrder = async (orderData) => {
    try {
      const response = await instance.post('/create', orderData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error de respuesta del servidor:', error.response.data);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        console.error('Error al realizar la solicitud:', error.message);
      }
  };
}


const deleteOrder = async (orderId) => {
  try {
    const response = await instance.delete(`/delete/${orderId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error de respuesta del servidor:', error.response.data);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al realizar la solicitud:', error.message);
    }
  }
};



export const ordersService = {
    getAllOrders,
    updateOrder,
    createOrder,
    deleteOrder
};

