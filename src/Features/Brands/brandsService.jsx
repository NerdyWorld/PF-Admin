import axios from "axios";
import {base_url} from "../../Utils/utilities"

const getAllBrands = async () => {

    const response = await axios(`${base_url}/brands/get-all-brands`);

    return response.data;
}

const deleteBrand = async (brandId) => {


    try {
        const response = await axios.delete(`${base_url}/brands/delete/${brandId}`);
        return response.data;
      } catch (error) {
        console.error("Error al hacer la petición DELETE:", error);
        throw error;
      }
    };


const createBrand = async (newBrand) => {

    
    try {
        const response = await axios.post(`${base_url}/brands/create`, newBrand);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error; 
      }
}

export const brandService = {
    getAllBrands,
    deleteBrand,
    createBrand
}

