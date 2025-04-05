import User from '../models/User.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOTP = async (req, res) => {
  const { email, role } = req.body;

  const otp = generateOTP();

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email, role, otp });
  } else {
    user.otp = otp;
  }

  await user.save();

  await transporter.sendMail({
    to: email,
    subject: "KLH Lost & Found OTP",
    text: `Your OTP is ${otp}`
  });

  res.status(200).json({ message: "OTP sent" });
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({ token, role: user.role });
};
