import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useCategories from "../../hooks/Categories/useCategories";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

const CategoryList = () => {
  const {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading,
  } = useCategories();
  useEffect(() => {
    fetchCategories();
  }, []);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      await createCategory(name);
      setName("");
    } catch (err) {
      console.error(err);
      toast.error("Creating Category Failed, try again");
    }
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category Name is required");
      return;
    }
    try {
      const { _id } = selectedCategory;
      await updateCategory(updatingName, _id);
      setModalVisible(false);
      toast.success("category updated");
    } catch (err) {
      console.error(err);
      toast.error("Creating Category Failed, try again");
    }
  };
  const handleDeleteCategory = async () => {
    try {
      const { _id } = selectedCategory;
      await deleteCategory(_id);
      setSelectedCategory(null);
      setModalVisible(false);
    } catch (err) {
      console.error(err);
      toast.error("Creating Category Failed, try again");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories.length > 0 &&
            categories.map((category) => (
              <div key={category._id}>
                <button
                  className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => {
                    {
                      setModalVisible(true);
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
