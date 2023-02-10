// import formModel
const formModel = require('../models/formModel')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');

const transporter = nodemailer.createTransport({
    // host: 'smtp.example.com',
    // port: 587,
    // secure: false,
    service: 'gmail',
    auth: {
        user: 'rajeevranjan14a@gmail.com',
        pass: 'kdcfqsahzuguqkjl'
    }
});



module.exports.signup = async (req, res) => {
    const fullName = req.body.fullName
    const email = req.body.email
    const mobile = req.body.mobile
    const password = req.body.password

    const otp = Math.floor(10 + Math.random() * 10000);


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


        console.log(req.body, otp, "21")
        // res.send('i am add data');

        const newUser = new formModel({ fullName, email, mobile, password, otp, isEmailVerified: false })

        try {
            await transporter.sendMail({
                to: email,
                subject: 'Verify Your Email',
                text: `Your OTP is: ${otp}`
            });

            const isSaved = await newUser.save()

            if (isSaved) {
                res.send({ code: 201, message: 'saved', otp })
            }


        } catch (error) {
            res.status(500).json({ message: 'Could not send OTP. Please try again later.' });
            return;
        }
    }
}


exports.verifyOtp = async (req, res) => {
    const { email, otpInput } = req.body;

    console.log(email, otpInput, "email and otp")

    const user = await formModel.findOne({ email });

    if (!user) {
        res.status(400).json({ message: 'userModel not found.' });
        return;
    }

    if (user.otp === otpInput) {
        await formModel.updateOne({ email }, { $set: { isEmailVerified: true } });

        const newuser = new userModel({
            fullName: user.fullName,
            email: user.email,
            mobile: user.mobile,
            password: user.password
        });
        await newuser.save();
        res.json({ message: 'Verification Done. userModel details moved to userschema' });
        return;
    }

    else {
        res.status(400).json({ message: 'Incorrect OTP.' });
        return;
    }
};

module.exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email) {
        return res.send({ code: 400, message: 'email Required' })
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required' })
    } else {

        const isEmailExists = await userModel.findOne({ email: email })

        console.log(isEmailExists, "isEmailExists")

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