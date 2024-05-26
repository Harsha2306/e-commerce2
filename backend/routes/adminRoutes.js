const express = require("express");

const adminController = require("../controllers/adminController");
const adminValidator = require("../validators/adminValidator");

const router = express.Router();

router.get("/", adminController.getALLProducts);
router.post(
  "/add-product",
  [
    adminValidator.validateItemName,
    adminValidator.validateItemPrice,
    adminValidator.validateItemDiscount,
    adminValidator.validateItemDescription,
  ],
  adminController.postProduct
);
router.get("/product/:productId", adminController.getProductById);
module.exports = router;
