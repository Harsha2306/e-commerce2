const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = require("./cartItem");

const shoppingCartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);
