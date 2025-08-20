// src/utils/jwt.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // never use default in prod
const JWT_EXPIRES_IN = "1h"; // token lifetime

// Generate JWT for a user
export function generateToken(user) {
  return jwt.sign(
    {
      sub: user.sub,  // subject claim
      role: user.role // add role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Verify JWT and return payload
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
}

