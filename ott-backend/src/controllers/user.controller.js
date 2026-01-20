const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// SIGNUP API LOGIC
exports.signup = async (req, res) => {
  try {
    // 1Read email & password from request
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    // 1️⃣ Empty check after trimming
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    //  Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Password length check
    if (password.length < 6 || password.length > 20) {
      return res.status(400).json({
        message: "Password must be 6 to 20 characters long",
      });
    }

    // Name length check
    if (name.length < 2 || name.length > 12) {
      return res.status(400).json({
        message: "Name must be at 2 to 12 characters long",
      });
    }

    //  Email length check (max)
    if (email.length > 50) {
      return res.status(400).json({ 
        message: "Email must be less than 50 characters long" 
      });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //  Send success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
