// This is a temporary in-memory OTP store for testing purposes
const otpStore = {};

export const sendOtp = (req, res) => {
  const { email, role } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  otpStore[email] = { otp, role, expires: Date.now() + 5 * 60 * 1000 }; // expires in 5 min

  console.log(`🔐 OTP for ${email} (${role}): ${otp}`);
  res.status(200).json({ message: 'OTP sent successfully (console only for now)' });
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore[email];

  if (!stored) {
    return res.status(400).json({ error: 'No OTP found. Please request a new one.' });
  }

  if (stored.otp !== otp) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }

  if (Date.now() > stored.expires) {
    return res.status(403).json({ error: 'OTP expired' });
  }

  // In production, you'd issue a real JWT here
  return res.status(200).json({
    message: 'OTP verified',
    token: 'fake-jwt-token',
    role: stored.role,
  });
};
