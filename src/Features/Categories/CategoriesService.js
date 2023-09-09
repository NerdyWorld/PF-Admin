import axios from "axios";


const getAllCategories = async() =>{
  const response = await axios("http://localhost:3001/api/categories/get-all-categories");
  
  return response.data
};


const deleteCategory = async(categoryId) =>{
  const response = await axios.delete(`http://localhost:3001/api/categories/${categoryId}`);
  
  return response.data
};


// Yes, dejame que levanto el server a ver si no rompe nada


export const categoriesService = {
  getAllCategories,
  deleteCategory
};


// Claro aca van los services y los slices, estamos usando toolkit
// Ahora lo hacemos