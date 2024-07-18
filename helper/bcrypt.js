const bcrypt = require('bcryptjs')


function hashPass(password) {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash
    } catch (error) {
        throw error
    }
}

function comparePass(dbPassword, inputPassword) {
    return bcrypt.compareSync(inputPassword, dbPassword)
}

module.exports = {hashPass, comparePass}