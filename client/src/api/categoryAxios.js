import axios from "axios";
const CATEGORIES_BASE_URL = 'http://localhost:5000/api/category'



const categoryAxios = axios.create({
    baseURL: CATEGORIES_BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  });

  export default categoryAxios