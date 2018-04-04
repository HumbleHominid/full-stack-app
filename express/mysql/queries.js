module.exports = {
    // use `\?` to tell sql to escape the parameter
    users: {
        get all() {
            return 'SELECT * FROM FSA_USERS';
        },
        get byID() {
            return `SELECT * FROM FSA_USERS WHERE id=\?`;
        },
        get byFName() {
            return 'SELECT * FROM FSA_USERS WHERE firstname=\?';
        }
    }
}
