import jwt from "jsonwebtoken";
import "dotenv/config";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "User not authorised!" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(tokenDecode.id)
    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // ✅ Store in req.userId, not req.body
      // console.log("Decoded userId:", req.userId);
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
