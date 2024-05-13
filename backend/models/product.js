const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemDiscount: { type: Number, required: true },
    itemDescription: { type: String, required: true },
    itemTag: { type: String },
    itemCategory: { type: String, required: true },
    itemGender: { type: String, required: true },
    itemAvailableSizes: [{ type: String, required: true }],
    itemAvailableColors: [{ type: String, required: true }],
    itemAvailableImages: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);