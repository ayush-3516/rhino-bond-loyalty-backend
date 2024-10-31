const firebaseAdmin = require('firebase-admin');

exports.validateToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};
