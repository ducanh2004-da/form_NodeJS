const db = require('../utils/db');
const getAllCategories = (callback) =>{
    db.query('SELECT * FROM categories',callback)
}
module.exports = {
    getAllCategories
};