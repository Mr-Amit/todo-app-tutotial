const jwt = require('jsonwebtoken')

const authenticator = async function (req, res, next) {
    try {
        let token = req.headers['authorization']
        if (!token) {
            return res.status(400).send({ status: false, message: 'You are not logged in, Please login to proceed your request' })
        }
        let decodedToken = jwt.verify(token, "rupali-secret-key")
        if (decodedToken) {
            next();
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { authenticator }