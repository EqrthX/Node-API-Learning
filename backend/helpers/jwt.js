const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "refresh token required" });
  }

  // เช็คว่ามีใน DB ไหม
  const [rows] = await db.query(
    "SELECT * FROM user_tokens WHERE refresh_token = ?",
    [refreshToken]
  );

  if (rows.length === 0) {
    return res.status(403).json({ message: "invalid refresh token" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const payload = { userId: decoded.userId };
    const newAccessToken = generateAccessToken(payload);

    return res.json({
      accessToken: newAccessToken
    });

  } catch (error) {
    return res.status(403).json({ message: "refresh token expired" });
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshToken
};