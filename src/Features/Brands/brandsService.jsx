import axios from "axios";
import {base_url} from "../../Utils/utilities"

const getAllBrands = async () => {

    const response = await axios(`${base_url}/brands/get-all-brands`);

    return response.data;
}

const deleteBrand = async (brandId) => {

    const response = await axios.delete(`${base_url}/brands/delete/${brandId}`);

    return response.data;
}

const createBrand = async (newBrand) => {

    const response = await axios.post(`${base_url}/brands/create`, newBrand);

    return response.data;
}

export const brandService = {
    getAllBrands,
    deleteBrand,
    createBrand
}

