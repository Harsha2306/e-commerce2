const Product = require("../models/product");
const { handleError } = require("../util/handleError");
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const mongoose = require("mongoose");

exports.getProducts = async (req, res, next) => {
  try {
    const { category, sortBy, min, max, gender } = req.query;
    const page = +req.query.page || 1;
    const perPage = 12;
    const totalProducts = await Product.find().countDocuments();
    if (!totalProducts) {
      throw handleError({
        message: "Can't fetch products",
        statusCode: 500,
        ok: false,
      });
    }
    const maxPage = Math.ceil(totalProducts / perPage);
    if (page > maxPage) {
      throw handleError({
        message: "No more products",
        statusCode: 500,
        ok: false,
      });
    }
    console.log(category, sortBy, min, max, gender, page);
    let categories;
    if (category) categories = category.split(",");

    let query = { itemGender: gender };
    if (categories && categories.length > 0) {
      query = { itemCategory: { $in: categories } };
    }
    if (min || max) {
      if (!query.itemPrice) {
        query.itemPrice = {};
        if (min !== undefined) {
          query.itemPrice.$gte = min;
        }
        if (max !== undefined) {
          query.itemPrice.$lte = max;
        }
      }
    }

    let sortOptions = {};
    if (sortBy) {
      if (sortBy === "asc") {
        sortOptions = { itemPrice: 1 };
      } else if (sortBy === "dsc") {
        sortOptions = { itemPrice: -1 };
      } else if (sortBy === "latest") {
        sortOptions = { createdAt: -1 };
      }
    }

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * perPage)
      .limit(perPage);

    const filteredProducts = await Product.find(query).sort(sortOptions);

    if (!products || !filteredProducts) {
      throw handleError({
        message: "Error occured while fetching products",
        statusCode: 500,
        ok: false,
      });
    }

    let pagination = {};
    pagination.filteredProducts = filteredProducts.length;
    pagination.page = page;
    pagination.first = {};
    pagination.second = {};
    pagination.third = {};
    pagination.first.isActive = false;
    pagination.second.isActive = false;
    pagination.third.isActive = false;
    pagination.first.isDisabled = false;
    pagination.second.isDisabled = false;
    pagination.third.isDisabled = false;
    pagination.previousIsDisabled = false;
    pagination.nextIsDisabled = false;
    pagination.totalProducts = totalProducts;
    pagination.maxPage = maxPage;
    if (page === 1) {
      pagination.start = 1;
      pagination.end = perPage * page;
      pagination.first.isActive = true;
      pagination.previousIsDisabled = true;
      pagination.first.page = 1;
      pagination.second.page = 2;
      pagination.third.page = maxPage;
      pagination.nextPage = page + 1;
    } else if (page === maxPage) {
      pagination.end = pagination.filteredProducts;
      pagination.start = (page - 1) * perPage + 1;
      pagination.third.isActive = true;
      pagination.first.page = 1;
      pagination.second.page = maxPage - 1;
      pagination.third.page = maxPage;
      pagination.nextIsDisabled = true;
      pagination.previousPage = page - 1;
    } else {
      pagination.start = (page - 1) * perPage + 1;
      pagination.nextPage = page + 1;
      pagination.previousPage = page - 1;
      pagination.second.isActive = true;
      pagination.first.page = 1;
      pagination.end = perPage * page;
      pagination.second.page = page;
      pagination.third.page = maxPage;
    }
    if (pagination.filteredProducts < perPage) {
      pagination.nextIsDisabled = true;
      pagination.second.isDisabled = true;
      pagination.third.isDisabled = true;
      if (page === 1 || page === maxPage) {
        pagination.end = pagination.filteredProducts;
      }
    }

    res.status(200).json({
      ok: true,
      products,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  res.status(200).json({
    ok: true,
  });
};

exports.getProductById = async (req, res, next) => {
  try {
    let { productId } = req.params;
    productId = new mongoose.Types.ObjectId(productId);
    const product = await Product.findOne({ _id: productId });
    if (!productId) {
      throw handleError({
        message: "No product found with id " + productId,
        statusCode: 404,
        ok: false,
      });
    }
    console.log(product);
    const colorsWithImages = [];
    product.itemAvailableColors.map((color, idx) => {
      let colorWithImage = {};
      colorWithImage.color = color;
      colorWithImage.imgs = product.itemAvailableImages.slice(
        6 * idx,
        (idx + 1) * 6
      );
      colorsWithImages.push(colorWithImage);
    });
    const products = await Product.find({ itemGender: product.itemGender });
    if (!products) {
      throw handleError({
        message: "No products found",
        statusCode: 404,
        ok: false,
      });
    }
    const randoms = generateDistinctRandomNumbers(0, products.length - 1, 10);
    const relatedProducts = [];
    randoms.map((num) => relatedProducts.push(products[num]));
    res.status(200).json({
      ok: true,
      product,
      colorsWithImages,
      relatedProducts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecommendedAndNewArrivals = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      throw handleError({
        message: "Can't fetch products",
        statusCode: 500,
        ok: false,
      });
    }
    const limit = Math.floor(products.length / 2);
    const r1 = generateDistinctRandomNumbers(0, limit, 10);
    const r2 = generateDistinctRandomNumbers(
      limit + 1,
      products.length - 1,
      10
    );
    const recommended = [];
    r1.map((num) => recommended.push(products[num]));
    const newArrivals = [];
    r2.map((num) => newArrivals.push(products[num]));
    res.status(200).json({
      ok: true,
      products: { recommended, newArrivals },
    });
  } catch (error) {
    next(error);
  }
};

function generateDistinctRandomNumbers(min, max, count) {
  if (count > max - min + 1) {
    throw new Error(
      "Cannot generate more distinct random numbers than the range allows."
    );
  }
  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers.slice(0, count);
}

exports.addToCart = async (req, res, next) => {
  const productId = new mongoose.Types.ObjectId(req.body.productId);
  const { size, color } = req.body;
  const userId = new mongoose.Types.ObjectId(req.userId);
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw handleError({
        message: "No product found",
        statusCode: 404,
        ok: false,
      });
    }
    let itemPrice = product.itemPrice;
    let itemDiscount = product.itemDiscount;
    const hasDiscount = product.itemDiscount === 0 ? false : true;
    if (hasDiscount) {
      itemPrice = Math.round(itemPrice - itemPrice * (itemDiscount / 100));
    }
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() &&
        item.size === size &&
        item.color === color
    );
    if (itemIndex === -1) {
      cart.items.unshift({
        productId: productId,
        quantity: 1,
        price: itemPrice,
        total: itemPrice,
        size,
        color,
      });
    } else {
      const cartItem = cart.items[itemIndex];
      cartItem.quantity += 1;
      cartItem.total = cartItem.price * cartItem.quantity;
    }
    cart.totalPrice += itemPrice;
    const updatedCart = await cart.save();
    if (!updatedCart) {
      throw handleError({
        message: "Can't update cart",
        statusCode: 500,
        ok: false,
      });
    }
    res.status(201).json({
      ok: true,
      cartLength: updatedCart.items.length,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const productId = new mongoose.Types.ObjectId(req.body.productId);
    const { size, color } = req.body;
    const userId = new mongoose.Types.ObjectId(req.userId);
    let cart = await Cart.findOne({ userId });
    if (!cart)
      throw handleError({
        message: "No cart found",
        statusCode: 404,
        ok: false,
      });
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw handleError({
        message: "No product found",
        statusCode: 404,
        ok: false,
      });
    }
    const requiredItemIdx = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() &&
        item.size === size &&
        item.color === color
    );
    if (requiredItemIdx === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
        ok: false,
      });
    }
    const unitPrice =
      cart.items[requiredItemIdx].total / cart.items[requiredItemIdx].quantity;
    if (cart.items[requiredItemIdx].quantity === 1)
      cart.items.splice(requiredItemIdx, 1);
    else {
      cart.items[requiredItemIdx].quantity--;
      cart.items[requiredItemIdx].total =
        cart.items[requiredItemIdx].price *
        cart.items[requiredItemIdx].quantity;
    }
    cart.totalPrice -= unitPrice;
    const updatedCart = await cart.save();
    if (!updatedCart)
      throw handleError({
        message: "updated cart not saved",
        statusCode: 500,
        ok: false,
      });
    if (updatedCart.items.length === 0)
      await Cart.deleteOne({
        _id: updatedCart._id,
      });
    res.status(200).json({
      ok: true,
      cartLength: updatedCart.items.length,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeEntireItemFromCart = async (req, res, next) => {
  try {
    const productId = new mongoose.Types.ObjectId(req.body.productId);
    const { size, color } = req.body;
    const userId = new mongoose.Types.ObjectId(req.userId);
    let cart = await Cart.findOne({ userId });
    if (!cart)
      throw handleError({
        message: "No cart found",
        statusCode: 404,
        ok: false,
      });
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw handleError({
        message: "No product found",
        statusCode: 404,
        ok: false,
      });
    }
    const requiredItemIdx = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() &&
        item.size === size &&
        item.color === color
    );
    if (requiredItemIdx === -1) {
      throw handleError({
        message: "Item not found in cart",
        statusCode: 404,
        ok: false,
      });
    }
    cart.totalPrice -= cart.items[requiredItemIdx].total;
    cart.items.splice(requiredItemIdx, 1);
    const updatedCart = await cart.save();
    if (!updatedCart)
      throw handleError({
        message: "unable to save cart",
        statusCode: 500,
        ok: false,
      });
    if (updatedCart.items.length === 0)
      await Cart.deleteOne({
        _id: updatedCart._id,
      });
    res.status(200).json({
      ok: true,
      cartLength: updatedCart.items.length,
    });
  } catch (error) {
    next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const productId = new mongoose.Types.ObjectId(req.body.productId);
  const { size, color } = req.body;
  const userId = new mongoose.Types.ObjectId(req.userId);
  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw handleError({
        message: "No product found",
        statusCode: 404,
        ok: false,
      });
    }
    let itemPrice = product.itemPrice;
    let itemDiscount = product.itemDiscount;
    const hasDiscount = product.itemDiscount === 0 ? false : true;
    if (hasDiscount) {
      itemPrice = Math.round(itemPrice - itemPrice * (itemDiscount / 100));
    }
    const item = wishlist.items.find(
      (item) =>
        item.productId.toString() === productId.toString() &&
        item.size === size &&
        item.color === color
    );
    if (item === undefined) {
      wishlist.items.unshift({
        productId: productId,
        price: itemPrice,
        size,
        color,
      });
    }
    const updatedWishlist = await wishlist.save();
    if (!updatedWishlist) {
      throw handleError({
        message: "Can't update Wishlist",
        statusCode: 500,
        ok: false,
      });
    }
    res.status(201).json({
      ok: true,
      wishlistLength: updatedWishlist.items.length,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const itemId = new mongoose.Types.ObjectId(req.body.productId);
    const userId = new mongoose.Types.ObjectId(req.userId);
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      throw handleError({
        message: "No wishlist found",
        statusCode: 404,
        ok: false,
      });
    }
    const itemIdx = wishlist.items.findIndex(
      (item) => itemId.toString() === item._id.toString()
    );
    if (itemIdx === -1)
      throw handleError({
        message: "No item found in wishlist",
        statusCode: 404,
        ok: false,
      });
    wishlist.items.splice(itemIdx, 1);
    const updatedWishlist = await wishlist.save();
    res.status(200).json({
      ok: true,
      wishlistLength: updatedWishlist.items.length,
    });
    if (updatedWishlist.items.length === 0) {
      await Wishlist.findByIdAndDelete(updatedWishlist._id);
    }
  } catch (error) {
    next(error);
  }
};

exports.checkIfProductPresentInWishlist = async (req, res, next) => {
  const { productId, selectedSize, selectedColor } = req.query;
  console.log(req.query, req.userId);
  let addedToWishList;
  try {
    if (req.userId && productId && selectedSize && selectedColor) {
      const wishList = await Wishlist.findOne({ userId: req.userId });
      if (!wishList) {
        throw handleError({
          message: "No wishlist found",
          statusCode: 404,
          ok: false,
        });
      }
      addedToWishList = wishList.items.find(
        (item) =>
          item.productId.toString() === productId &&
          item.size === selectedSize &&
          item.color === selectedColor
      );
    }
    res.status(200).json({
      ok: true,
      addedToWishList: addedToWishList !== undefined,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserDetails = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const user = await User.findOne({ _id: userId });
    if (!user)
      throw handleError({
        message: "No user found",
        statusCode: 404,
        ok: false,
      });
    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
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
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword)
      throw handleError({
        message: "Validation Error",
        statusCode: 422,
        errorFields: [
          {
            field: "newPassword",
            errorMessage:
              "new password doesn't match with confirm new password",
          },
        ],
        ok: false,
      });
    if (
      newPassword === currentPassword &&
      currentPassword === confirmNewPassword
    ) {
      throw handleError({
        message: "Validation Error",
        statusCode: 422,
        errorFields: [
          {
            field: "newPassword",
            errorMessage: "new password can't be the previous password",
          },
        ],
        ok: false,
      });
    }
    const userId = new mongoose.Types.ObjectId(req.userId);
    const user = await User.findOne({ _id: userId });
    if (!user)
      throw handleError({
        message: "No user found",
        statusCode: 404,
        ok: false,
      });
    const checkPassword = await bcrypt.compare(currentPassword, user.password);
    if (!checkPassword) {
      throw handleError({
        message: "password not found",
        statusCode: 404,
        ok: false,
        errorFields: [
          {
            field: "currentPassword",
            errorMessage: "Please check your password",
          },
        ],
      });
    }
    const updatedHashedPassword = await bcrypt.hash(newPassword, 12);
    if (!updatedHashedPassword) {
      throw handleError({
        message: "Internal server errir",
        statusCode: 500,
        ok: false,
      });
    }
    user.password = updatedHashedPassword;
    const savedUser = await user.save();
    if (!savedUser)
      throw handleError({
        ok: false,
        statusCode: 500,
      });
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const text = req.query.search;
    let products;
    if (text.trim().length === 0) {
      products = [];
    } else {
      const regex = new RegExp(text, "i");
      products = await Product.find({
        itemName: { $regex: regex },
      });
      if (!products)
        throw handleError({
          ok: false,
          statusCode: 404,
        });
    }
    res.status(200).json({
      ok: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const wishlist = await Wishlist.findOne({ userId: userId }).populate({
      path: "items.productId",
      model: "product",
    });
    if (!wishlist)
      throw handleError({
        message: "No wishlist found",
        statusCode: 404,
        ok: false,
      });
    const wishlistProds = wishlist.items.map((product) => {
      const productInfo = product.productId;
      const idx = productInfo.itemAvailableColors.findIndex(
        (color) => color === product.color
      );
      const img = idx !== -1 ? productInfo.itemAvailableImages[6 * idx] : null;
      return {
        _id: product._id,
        productId: productInfo._id,
        name: productInfo.itemName,
        img,
        color: product.color,
        size: product.size,
        price: product.price,
      };
    });
    res.status(200).json({
      ok: true,
      wishlist: wishlistProds,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      model: "product",
    });
    if (!cart) {
      throw handleError({
        message: "No cart found",
        statusCode: 404,
        ok: false,
      });
    }
    const cartItems = cart.items.map((item) => {
      const idx = item.productId.itemAvailableColors.findIndex(
        (color) => color === item.color
      );
      return {
        name: item.productId.itemName,
        img: item.productId.itemAvailableImages[6 * idx],
        color: item.color,
        size: item.size,
        price: item.total,
        _id: item._id,
        quantity: item.quantity,
        productId: item.productId._id,
      };
    });
    res.status(200).json({
      ok: true,
      cart: { items: cartItems, totalPrice: cart.totalPrice },
    });
  } catch (error) {
    next(error);
  }
};
