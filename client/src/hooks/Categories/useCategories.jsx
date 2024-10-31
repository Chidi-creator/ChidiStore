import categoryAxios from "../../api/categoryAxios";
import { toast } from "react-toastify";
import { useState } from "react";

const useCategories = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([])

  const createCategory = async (name) => {
    const CREATE_CATEGORY_URL = "/";
    try {
      setIsLoading(true);
      const categoryParameters = { name };
      const response = await categoryAxios.post(
        CREATE_CATEGORY_URL,
        categoryParameters
      );
      setError(null);
      setCategories([...categories, response.data])
      console.log(response.data);
      toast.success(`${response.data.name} is created`)
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError("An Error occured. Please try again");
        toast.error("An error occured. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const updateCategory = async (updatedName, categoryId) => {
    const UPDATE_CATEGORY_URL = `/${categoryId}`;
    try {
      setIsLoading(true);
      const updateParameters = { name: updatedName };
      const response = await categoryAxios.put(
        UPDATE_CATEGORY_URL,
        updateParameters
      );
      console.log(response.data);
      const updatedCategories = categories.map(category => category._id === categoryId ? {...category, name:updatedName}: category)
      setCategories(updatedCategories)

      setError(null);
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError("An Error occured. Please try again");
        toast.error("An error occured. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const deleteCategory = async (categoryId) =>{
const DELETE_CATEGORY_URL =  `/${categoryId}`
try{
    const response = await categoryAxios.delete(DELETE_CATEGORY_URL)
    const updatedCategories = categories.filter(category => category._id != categoryId )
    setCategories(updatedCategories)
    console.log(response.data)
    toast.success(`${response.data.name} has been successfuly deleted`)

} catch (err) {
    if (err?.response?.data?.message) {
      setError(err.response.data.message);
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    } else {
      setError("An Error occured. Please try again");
      toast.error("An error occured. Please try again");
    }
  } finally {
    setIsLoading(false);
  }
  }
const fetchCategories = async() =>{
    const FETCH_CATEGORIES_URL = '/categories'

    try{
        setIsLoading(true)
            const response = await categoryAxios.get(FETCH_CATEGORIES_URL)
                // console.log(response.data)
                setCategories(response.data)
    }catch (err) {
        if (err?.response?.data?.message) {
          setError(err.response.data.message);
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        } else {
          setError("An Error occured. Please try again");
          console.log(err)
        }
      } finally {
        setIsLoading(false);
      }
}


  return { createCategory, updateCategory, isLoading, error, deleteCategory, categories, fetchCategories };
};

export default useCategories;
