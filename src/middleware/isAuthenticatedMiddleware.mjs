const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const error = new Error("Authentication failed");
    error.status = 404;
    next(error);
  }
};

export default isAuthenticated;
