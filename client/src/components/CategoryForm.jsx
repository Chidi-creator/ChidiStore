const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
  }) => {
    return (
      <div className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            className="py-3 px-4 border rounded-lg w-full"
            placeholder="Write category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
  
          <div className="flex justify-between">
            {/* Update Button */}
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-pink-500 focus:ring-opacity-50"
            >
              {buttonText}
            </button>
  
            {/* Delete Button - Ensuring it doesn't submit the form */}
            {handleDelete && (
              <button
                type="button" // Important to set type="button" to avoid form submission
                onClick={handleDelete} // Triggering the delete function
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };
  
  export default CategoryForm;
  