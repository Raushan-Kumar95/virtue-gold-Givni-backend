// import formModel
const formModel = require('../models/formModel')
const jwt = require('jsonwebtoken');


module.exports.signup = async (req, res) => {


    const fullName = req.body.fullName
    const email = req.body.email
    const mobile = req.body.mobile
    const password = req.body.password

    if (!fullName) {
        return res.send({ code: 400, message: 'fullName Required' })
    } else if (!email) {
        return res.send({ code: 400, message: 'email Required' })
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required' })
    } else {
        const existingUser = await formModel.findOne({ email: email })
        if (existingUser) {
            return res.send({ code: 409, message: 'Account already exists with this email' })
        }

        console.log(req.body, "21")
        // res.send('i am add data');

        const newUser = new formModel({ fullName, email, mobile, password })
        const isSaved = await newUser.save()
        if (isSaved) {
            res.send({ code: 201, message: 'saved' })
        } else {
            res.send({ code: 500, message: 'saved error' })
        }

    }
}


module.exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password


    if (!email) {
        return res.send({ code: 400, message: 'email Required' })
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required' })
    } else {

        const isEmailExists = await formModel.findOne({ email: email })

        if (isEmailExists) {
            console.log(isEmailExists.password, "Email Exists")

            if (isEmailExists.password == req.body.password) {
                const token = jwt.sign({ email: isEmailExists.email, password: isEmailExists.password, type: isEmailExists.type }, 'MYKEY');
                return res.send({ code: 200, message: 'login success', token: token, user: "USER" })
            } else {
                return res.send({ code: 404, message: 'password wrong' })
            }
        } else {
            return res.send({ code: 404, message: 'email not found' })
        }
    }
}