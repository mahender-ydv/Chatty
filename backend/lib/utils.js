import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const secret = process.env.JWT_SECRET || "default_jwt_secret_key_12345";
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks
    sameSite: isProduction ? "none" : "lax", // cross-site cookies in production
    secure: isProduction, // HTTPS required for sameSite: "none"
  });

  return token;
};