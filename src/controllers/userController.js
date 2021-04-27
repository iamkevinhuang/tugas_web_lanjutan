const bcrypt = require('bcryptjs');
const database = require('../../models');
const User = database.User;

const userController = {
    show: async (req, res) => {
        res.status(200).send({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        })
    },
    update: async (req, res) => {
        try{
            const user = req.user;
            
            if (req.body.name && req.body.name.length > 0){
                user.name = req.body.name;
            }

            if (req.body.email && req.body.email.length > 0){
                const checkEmailExist = await User.findOne({
                    where: {
                        email: req.body.email
                    }
                });

                if (checkEmailExist && req.body.email != user.email){
                    throw new Error("Email telah terdaftar untuk akun lain !");
                }
                else{
                    user.email = req.body.email;
                }
            }
            
            if (req.body.password && req.body.password.length > 0){
                if (req.body.password_confirmation && req.body.password == req.body.password_confirmation){
                    user.password = await bcrypt.hash(req.body.password, 8);
                }
                else{
                    throw new Error("Password dan Password Konfirmasi tidak sama !");
                }
            }

            user.save();

            res.status(200).send({
                email: user.email,
                name: user.name,
            })
        } catch (error){
            return res.status(422).send({error: error.message});
        }
    },
};

module.exports = userController;