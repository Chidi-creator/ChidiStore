const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
//controllers
const {
  addProduct,
  updateProductDetails,
  deleteProduct,
  fetchProducts,
  fetchProductsById,
  fetchAllProducts
} = require("../controllers/productController");

const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const checkId = require("../middlewares/checkId");

router.route("/")
.get(fetchProducts)
.post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/allproducts')
        .get(fetchAllProducts)

router
  .route("/:id")
  .get(fetchProductsById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, deleteProduct)

module.exports = router;
