import jwt from 'jsonwebtoken';

function generateJWTToken(userId, email, res){
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.cookie('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return token;
}

export default generateJWTToken;