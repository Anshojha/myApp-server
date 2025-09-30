import mongoose from "mongoose";

const orderShema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "user" },
  items: [
    {
      product: { type: String, required: true, ref: "product" },
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  paymentType: { type: String, enum: ["COD", "ONLINE"], default: "COD" },
  address: { type: String, required: true, ref: "address" },
  status: { type: String, default: "Order placed" },
  isPaid: { type: Boolean, required: true, default: false },
},{timestamps : true});

const Order = mongoose.model.order || mongoose.model("order", orderShema);

export default Order;
