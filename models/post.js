const db = require('../utils/db');

const getAllPosts = (callback) => {
    db.query('SELECT * FROM posts', callback);
};

module.exports = {
    getAllPosts, 
};