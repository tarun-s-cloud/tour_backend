import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract actual token

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user payload to req
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid " }); // Use 403 for invalid token
  }
};

