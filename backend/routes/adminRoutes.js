const express = require("express");
const { isAuthorized } = require("../util/isAuthorized");

const adminController = require("../controllers/adminController");
const adminValidator = require("../validators/adminValidator");

const router = express.Router();

//TODO make admin authorized code already implemented 

router.get("/", adminController.getAllProducts);
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
