const Controller = class LoginController {

    constructor() {
    }

    verifyCredentials(req, res) {
        console.log(req.body);
    }

    createUser(req, res) {

    }
}

module.exports = {
    Controller
}