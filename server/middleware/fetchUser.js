const jwt = require('jsonwebtoken');
const JWT_SECRET = "fgnhFDB4#%ff25#RFDV636(hmg4"; // we can add this in env variable


const fetchUser = (req, res, next) => {
    // Get the from the jwt token and id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using valid token" })
    }
}

module.exports = fetchUser;