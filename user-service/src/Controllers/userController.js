const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const nodemailer = require('nodemailer');  // Import Nodemailer


// REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid Password' });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the user data along with the token
    res.status(200).json({
      message: 'Login successful',
      token,
      firstName: user.firstName,  // Include firstName in the response
      username: user.username,    // Include username in the response
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Generate a random OTP (6 digits)
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();  // Generates a 6-digit OTP
};

// FORGOT PASSWORD - Generate OTP and send to email
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if required fields are missing
    if (!user.firstName || !user.lastName || !user.category) {
      return res.status(400).json({
        message: 'Missing required fields: firstName, lastName, category',
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Update OTP and expiration without triggering validation errors
    await User.updateOne(
      { email },
      {
        $set: {
          otp,
          otpExpiration: Date.now() + 10 * 60 * 1000,  // OTP expires in 10 minutes
        }
      }
    );

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP - CTSE Inventory System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0a5fff; text-align: center;">CTSE Inventory System</h2>
          <p>Hello,</p>
          <p>You requested to reset your password. Please use the OTP below to proceed:</p>
          <p style="font-size: 20px; font-weight: bold; text-align: center; margin: 20px 0; color: #333;">
            ${otp}
          </p>
          <p>This OTP will expire in <strong>10 minutes</strong>. If you didn’t request this, you can safely ignore this email.</p>
          <br/>
          <p style="font-size: 14px; color: #888;">Thanks,<br/>CTSE Inventory Team</p>
        </div>
      `
    };
    

    // Send the OTP to the user's email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent to email if user exists' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};


// VERIFY OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if OTP is correct and has not expired
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (user.otpExpiration < Date.now()) {
      user.otp = undefined;  // OTP expired, clear it
      await user.save();
      return res.status(400).json({ message: 'OTP expired' });
    }

    // OTP is valid, generate a reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'OTP validated', token: resetToken });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID (decoded from the token)
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been successfully reset' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};


// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];  // Assuming the token is sent as "Bearer token"

    if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use the same JWT_SECRET you used while signing the token
    const userId = decoded.userId;  // Get the userId from the decoded token

    // Find the user by userId
    const user = await User.findById(userId).select('-password');  // Exclude password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user profile excluding sensitive data
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      category: user.category,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error during fetching profile' });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    // Extract token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];  // Get token from "Bearer <token>"

    if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use the same JWT_SECRET you used while signing the token
    const userId = decoded.userId;  // Get userId from the decoded token

    // Get updated details from the request body
    const { firstName, lastName, phoneNumber, address, category } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's details
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;
    user.category = category || user.category;

    // Save the updated user
    await user.save();

    // Return updated user profile
    res.status(200).json({
      message: 'Profile updated successfully',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      category: user.category,
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};

// DELETE ACCOUNT
const deleteUserAccount = async (req, res) => {
  const { password } = req.body;
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers

  try {
    if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });

    // Decode the token to get the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded userId from the token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Delete the user account from the database
    await User.findByIdAndDelete(user._id);  // User deletion based on _id

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Error during account deletion:', err);
    res.status(500).json({ message: 'Server error during account deletion' });
  }
};





module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};
