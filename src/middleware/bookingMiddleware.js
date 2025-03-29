import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({path: './.env'})

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization; // Get token from header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied, no token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract actual token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
        req.user = decoded; // Attach user info to req
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
};
