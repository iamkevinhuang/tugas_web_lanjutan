const database = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require ('../../config/jwt');

const User = database.User;

const authorizationController = {
    login: async (req, res) => {
        try{
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user && await bcrypt.compare(req.body.password, user.password)){
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email
                    },
                    jwtConfig.secret,
                    {
                        expiresIn: jwtConfig.expired
                    }
                );

                res.status(200).send({
                    token,
                    user
                });
            }
            else{
                throw new Error('Email atau Password salah !');
            }
        } catch (error){
            res.status(400).send({
                error: error.message
            })
        }
    },
    register: async (req, res) => {
        try {
            if (req.body.password_confirmation.length <= 0 || req.body.password.length <= 0 || req.body.name.length <= 0 || req.body.email.length <= 0){
                throw new Error('Nama, Email, Password dan Konfirmasi Password wajib diisi !');
            }

            if (req.body.password != req.body.password_confirmation){
                throw new Error('Password dan Konfirmasi Password tidak cocok !');
            }

            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            
            
            if (user){
                throw new Error('Email sudah terdaftar sebelumnya ! Silahkan Login Kembali !');
            }

            const encryptPassword = await bcrypt.hash(req.body.password, 8);
            
            
            const newUser = await User.create({
                email: req.body.email,
                name: req.body.name,
                password: encryptPassword
            })

            const token = jwt.sign(
                {
                    id: newUser.id,
                    email: newUser.email
                },
                jwtConfig.secret,
                {
                    expiresIn: jwtConfig.expired
                }
            );

            res.status(201).send({token, newUser});
        } catch (error){
            res.status(422).send({
                message: error.message
            });
        }
    }
};

module.exports = authorizationController;