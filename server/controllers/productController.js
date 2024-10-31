const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    // validation

    switch (true) {
      case !name:
        return res.json({ message: "Name is required" });
      case !brand:
        return res.json({ message: "Brand is required" });
      case !description:
        return res.json({ message: "Description is required" });
      case !price:
        return res.json({ message: "Price is required" });
      case !category:
        return res.json({ message: "Category is required" });
      case !quantity:
        return res.json({ message: "Quantity is required" });
    }
    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    // validation

    switch (true) {
      case !name:
        return res.json({ message: "Name is required" });
      case !brand:
        return res.json({ message: "Brand is required" });
      case !description:
        return res.json({ message: "Description is required" });
      case !price:
        return res.json({ message: "Price is required" });
      case !category:
        return res.json({ message: "Category is required" });
      case !quantity:
        return res.json({ message: "Quantity is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);

    await product.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fetchProducts = async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fetchProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message: "Product not found"})

      res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fetchAllProducts = async (req, res) =>{
try{
  const products = await Product.find({}).populate('category').limit(12).sort({createdAt: -1})

  res.status(200).json(products)
}catch(err){
  res.status(500).json({message: err.message})
}
}

module.exports = {
  addProduct,
  updateProductDetails,
  deleteProduct,
  fetchProducts,
  fetchProductsById,
  fetchAllProducts
};
