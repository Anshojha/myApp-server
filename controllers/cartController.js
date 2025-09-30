import User from "../models/User.js";

// Update user cart data =>  /api/cart/update

export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.userId; // ✅ Get from auth middleware
    await User.findByIdAndUpdate(userId, { cartItems });
    res.status(200).json({ success: true, message: "Cart items updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
