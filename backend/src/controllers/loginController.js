const userModel = require('../models/userModel');

const Controller = class LoginController {

    constructor() {
    }

    verifyCredentials(req, res) {
        console.log(req.body);
    }

    async createUser(req, res) {
        console.log(req.body)
        await userModel.create(req.body);
    }

}

module.exports = {
    Controller
}