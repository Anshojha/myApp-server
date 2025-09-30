import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  // console.log("Seller tokem" + sellerToken);

  if (!sellerToken) {
    return res.status(400).json({ success: false, message: "Not Authorised" });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
    // console.log("Token id ---->  " + tokenDecode);
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      req.user = tokenDecode;
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "User not authorised!" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Custome " + error.message });
  }
};

export default authSeller;
