const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../../firebase-service-account.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

exports.register = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const userRecord = await firebaseAdmin.auth().createUser({
      phoneNumber: phoneNumber
    });
    res.status(201).json({ message: 'User registered successfully', user: userRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    // Implement OTP verification logic here
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};

exports.validateToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    res.status(200).json({ message: 'Token validated successfully', decodedToken });
  } catch (error) {
    res.status(500).json({ message: 'Error validating token', error: error.message });
  }
};
