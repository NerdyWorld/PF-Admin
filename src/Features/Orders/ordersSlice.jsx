import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersService } from "./ordersService";

const initialState = {
  orders: [],
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false
};

export const createNewOrder = createAsyncThunk(
  "create-new-order",
  async (orderData, thunkAPI) => {
    try {
      return await ordersService.createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "get-all-orders",
  async (thunkAPI) => {
    try {
      return await ordersService.getAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "update-order",
  async (orderData, thunkAPI) => {
    try {
      return await ordersService.updateOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const deleteOrder = createAsyncThunk(
  "delete-order",
  async (orderId, thunkAPI) => {
    try {
      return await ordersService.deleteOrder(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL ORDERS
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.message = "Obteniendo Pedidos";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Obtención de Pedidos Exitosa";
        state.orders = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Error al obtener Pedidos";
        state.orders = [];
      })

      // CREATE NEW ORDER
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.message = "Creando Pedido";
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Creación de Pedido Exitosa";
        state.orders.push(action.payload.data);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Error al crear Pedido";
      })

      // UPDATE ORDER
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.message = "Actualizando Pedido";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Actualización de Pedido Exitosa";
        
         // Encuentra la orden que se actualizó en el arreglo y actualízala
        const updatedOrder = action.payload.data; // Suponiendo que la acción devuelve la orden actualizada
        const index = state.orders.findIndex(order => order.id === updatedOrder.id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Error al actualizar Pedido";
      })

      // DELETE ORDER
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.message = "Eliminando Pedido";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Eliminación de Pedido Exitosa";
        state.orders = state.orders.filter(order => order.id !== action.payload.id);
        console.log(action.payload.id)
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Error al eliminar Pedido";
      });
  }
});
