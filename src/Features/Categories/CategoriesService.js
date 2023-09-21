import axios from "axios";


const getAllCategories = async() =>{
  const response = await axios("http://localhost:3001/api/categories/get-all-categories");
  
  return response.data
};


const deleteCategory = async(categoryId) =>{
  try {
    const response = await axios.delete(`http://localhost:3001/api/categories/delete/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error al hacer la petición DELETE:", error);
    throw error;
  }
};

const createCategory = async (category) => {
  try {
    const response = await axios.post("http://localhost:3001/api/categories/create", category);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-lanza el error para que pueda ser manejado en otro lugar si es necesario
  }
};



export const categoriesService = {
  getAllCategories,
  deleteCategory,
  createCategory
};

