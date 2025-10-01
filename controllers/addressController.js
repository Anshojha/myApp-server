import Address from "../models/Address.js";
import User from "../models/User.js";

// Add address -> /api/address/add

export const addAddress = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      userId,
    } = req.body;

    // ✅ Ensure you're passing an object to the model constructor
    const newAddress = new Address({
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      userId,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Address saved successfully",
      newAddress,
    });
  } catch (error) {
    console.error("Address erroe -> "+error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// getAddress -> /api/address/get

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Use req.userId set in middleware
    console.log("User id from getAddress -> ", userId);

    const address = await Address.find({ userId });
    res.status(200).json({ success: true, address });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
