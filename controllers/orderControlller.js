// place an COD -> /api/order/cod

import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data!!" });
    }

    // Calculate the total amount
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Tax Charge
    amount += Math.floor(amount * 0.2);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully !!" });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ success: false, message: error.message });
  }
};

// Get order by userId ->   api/order/user

export const getUserOrder = async (req, res) => {
  try {
    const  userId  = req.userId;
    console.log("USERID", userId)
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders }); 
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ success: false, message: error.message });
  }
};

// Get All Orders ( for seller / admin ) -> /api/order/seller

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: "true" }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ success: false, message: error.message });
  }
};
