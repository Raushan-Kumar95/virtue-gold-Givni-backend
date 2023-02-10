const rolesModel = require('../models/rolesModel')

module.exports.addRole = async (req, res) => {
    console.log(req.body)
    const role = req.body.role
    const permission = req.body.permission

    const newRole = new rolesModel({ role, permission })

    if (!role || !permission) {
        return res.send({ code: 400, message: 'role and permission required' })
    } else {
        const isSaved = await newRole.save()
        if (!isSaved) {
            return res.send({ code: 500, message: 'error in saving' })
        } else {
            return res.send({ code: 200, message: 'role added' })
        }
    }

}

module.exports.deleteRole = async (req, res) => {

    return res.send({ code: 200, message: 'delete role' })

}