const { validationResult } = require("express-validator");

const { handleError } = require("../util/handleError");
const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.postProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorFields = errors.array().map((err) => {
        return { field: err.path, errorMessage: err.msg };
      });
      throw handleError({
        message: "Validation Error",
        statusCode: 422,
        errorFields,
        ok: false,
      });
    }
    const {
      itemName,
      itemPrice,
      itemDiscount,
      itemDescription,
      itemTag,
      itemCategory,
      itemGender,
      itemAvailableSizes,
      itemAvailableColors,
      itemAvailableImages,
    } = req.body;
    const itemColors = itemAvailableColors.split(",");
    const itemImages = itemAvailableImages.split("|");
    if (itemColors.length * 6 !== itemImages.length) {
      throw handleError({
        message: "Validation Error",
        statusCode: 422,
        errorFields: [
          {
            field: "itemAvailableImages",
            errorMessage: "Images has to be 6 multiple of sizes",
          },
        ],
        ok: false,
      });
    }
    const product = new Product({
      itemName,
      itemPrice,
      itemDiscount,
      itemDescription,
      itemTag,
      itemCategory,
      itemGender,
      itemAvailableSizes,
      itemAvailableColors: itemColors,
      itemAvailableImages: itemImages,
    });
    const savedProduct = await product.save();
    if (!savedProduct) {
      throw handleError({
        message: "Error occured while saving product",
        statusCode: 500,
        ok: false,
      });
    }
    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};
