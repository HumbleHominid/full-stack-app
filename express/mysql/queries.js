module.exports = {
    grades: {
        all() {
            return 'SELECT * FROM Grades';
        },
        byID(id) {
            return `SELECT * FROM Grades WHERE grade_id=${id}`
        }
    }
}
