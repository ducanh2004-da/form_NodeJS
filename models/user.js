const db = require('../utils/db');
const bcrypt = require('bcryptjs');

const getAllUser = (callback) => {
    db.query('SELECT * FROM users2', callback);
}

const findById = (id, callback) => {
    db.query('SELECT * FROM users2 WHERE id = ?', [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0] || null);
    });
};

const add = (newUser, callback) => {
    if (newUser.password) {
        // Only hash the password if it's provided (for normal registrations)
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) throw err;
            db.query(
                'INSERT INTO users2(username, email, password) VALUES (?, ?, ?)',
                [newUser.username, newUser.email, hash],
                callback
            );
        });
    }
    else if(newUser.facebookId) {
        db.query(
            'INSERT INTO users2(username, email, facebookId) VALUES (?, ?, ?)',
            [newUser.username, newUser.email, newUser.facebookId],
            callback
        );
    }
    else {
        // If no password, create the user without hashing (for Google/Facebook logins)
            db.execute(
                'INSERT INTO users2 (username, email, googleId, role) VALUES (?, ?, ?, ?)',
                [newUser.username, newUser.email, newUser.googleId, newUser.role || 'user'],
                // function (err, results) {
                //     if (err) return reject(err);
                //     resolve({ id: results.insertId, ...newUser });
                // }
                callback
            );
    }
};

const findByEmail = (email, callback) => {
    db.execute('SELECT * FROM users2 WHERE email = ?', [email], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0] || null); // Trả về user đầu tiên tìm thấy hoặc null nếu không tìm thấy
    });
}

const findByFacebookId = (facebookId,callback) =>{
    db.query('SELECT * FROM users2 WHERE facebookId = ?', [facebookId], callback);
}

const findByGoogleId = (googleId, callback) => {
    // Sử dụng pool để thực hiện truy vấn
    // Kiểm tra callback có phải là hàm hay không
    db.execute('SELECT * FROM users2 WHERE googleId = ?', [googleId], function (err, results) {
        if (err) {
            console.error('Error occurred while querying:', err);
            return callback(err);  // Trả về lỗi nếu có
        }
        return callback(null, results[0] || null);  // Trả về kết quả đầu tiên tìm thấy
    });
}

const saveOTP = (email,otp,expire,callback) =>{
    db.query('UPDATE users2 SET otp_code=?, otp_expires_at=? WHERE email =?',
        [otp,expire,email],callback
    )
}

const verifyOtp = (email,otp,callback) =>{
    db.query('SELECT * FROM users2 WHERE email = ? AND otp_code = ? AND otp_expires_at > NOW()',
        [email,otp],callback
    )
}

const resetPassword = (email,newPassword,callback) =>{
    db.query('UPDATE users2 SET password = ? WHERE email = ?'
        [newPassword,email],callback
    )
}

// const update = (newPass,email, callback) =>{
//     db.query('UPDATE users2 SET password = ? WHERE email = ? ',
//         [newPass,email],callback
//     )
// }

const deletes = (id,callback) =>{
    db.query('DELETE FROM users2 WHERE ProID = ?',
        [id],callback
    )
}

module.exports = {
    getAllUser, 
    findById,
    findByEmail,
    findByFacebookId,
    findByGoogleId,
    add,
    saveOTP,
    verifyOtp,
    resetPassword,
    deletes
};