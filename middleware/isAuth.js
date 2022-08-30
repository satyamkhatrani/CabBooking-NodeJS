const isAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(403);
  if (token == req.session.token) {
    console.log("token Verified");
    next();
  } else {
    return res.send("Token Expired");
  }
};

export default isAuth;
