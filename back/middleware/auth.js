const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // This const will get the token from the header (Bearer token)
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw "Cette ID de l'utilisaeur ne correspond pas";
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: error | 'Requête non autorisée' });
  }
};
