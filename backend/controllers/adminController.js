const { validationResult } = require("express-validator");

const { handleError } = require("../util/handleError");
const Product = require("../models/product");

const mongoose = require("mongoose");
const product = require("../models/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products)
      throw handleError({
        message: "No products found",
        statusCode: 404,
        ok: false,
      });
    res.status(200).json({
      ok: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    let { productId } = req.params;
    let product, colors, imgs;
    if (productId !== "null") {
      productId = new mongoose.Types.ObjectId(productId);
      product = await Product.findOne({ _id: productId });
      if (!product) {
        throw handleError({
          message: "No product found with id " + productId,
          statusCode: 404,
          ok: false,
        });
      }
      colors = product.itemAvailableColors.join(",");
      imgs = product.itemAvailableImages.join("|");
    }
    res.status(200).json({
      ok: true,
      product,
      colors,
      imgs,
    });
  } catch (error) {
    next(error);
  }
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
      productId,
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
    if (productId) {
      const productToUpdate = await Product.findById(productId);
      if (!productToUpdate)
        throw handleError({
          message: "product not found",
          statusCode: 404,
          ok: false,
        });
      productToUpdate.itemName = itemName;
      productToUpdate.itemDescription = itemDescription;
      productToUpdate.itemPrice = itemPrice;
      productToUpdate.itemDiscount = itemDiscount;
      productToUpdate.itemTag = itemTag;
      productToUpdate.itemCategory = itemCategory;
      productToUpdate.itemGender = itemGender;
      productToUpdate.itemAvailableSizes = itemAvailableSizes;
      productToUpdate.itemAvailableColors = itemColors;
      productToUpdate.itemAvailableImages = itemImages;
      const updatedProduct = await productToUpdate.save();
      if (!updatedProduct)
        throw handleError({
          message: "product update failed",
          statusCode: 500,
          ok: false,
        });
    } else {
      const newProduct = new Product({
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
      const savedProduct = await newProduct.save();
      if (!savedProduct) {
        throw handleError({
          message: "Error occured while saving product",
          statusCode: 500,
          ok: false,
        });
      }
    }
    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};
