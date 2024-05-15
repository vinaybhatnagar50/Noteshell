//  This is the middleware that we use on the places where we need to use the user authentication
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Vinay@$Bhatnagar";

const fetchuser = (req, res, next) => {
  //  Get the user from the Jwt Token and add id to request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
