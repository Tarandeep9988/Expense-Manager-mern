import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    {id: userId},
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const setCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: process.env.COOKIE_MAX_AGE || 24 * 60 * 60 * 1000, // 1 day
    path: '/',
  }
  res.cookies.set('token', token, cookieOptions);
}

const removeCookie = (res) => {
  res.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 0,
    path: '/',
  });
}

export { generateToken, verifyToken, setCookie, removeCookie };
