// middleware/auth.js
const auth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === 'secrettoken123') {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized: Missing or invalid API key" });
    }
};
module.exports = auth;

