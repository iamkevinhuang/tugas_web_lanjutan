const database = require('../../models');
const jwt = require('jsonwebtoken');
const jwtConfig = require ('../../config/jwt');

const User = database.User;

const authorization = async (req, res, next) => {
    try{
        const token = req.header('Authorization').split(" ")[1];
        const decoded = jwt.verify(token, jwtConfig.secret);

        const user = await User.findOne({
            where: {
                id: decoded.id
            }
        });

        if (!user){
            throw new Error("User tidak ditemukan");
        }

        req.token = token;
        req.user = user;
        next();
    } catch{
        res.status(403).send({error: 'Anda tidak boleh mengakses bagian ini !'})
    }
};


module.exports = authorization;