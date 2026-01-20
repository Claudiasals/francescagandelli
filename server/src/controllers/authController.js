// Gestisce login admin e dashboard

import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * POST /api/auth/login
 * Login admin
 */
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin non trovato" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Password errata" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Errore server" });
  }
};

/**
 * GET /api/auth/dashboard
 * Solo admin loggato può accedere
 */
export const getDashboard = (req, res) => {
  res.json({ message: "Benvenuta Francesca!", admin: req.admin });
};
