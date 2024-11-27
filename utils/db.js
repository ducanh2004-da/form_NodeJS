// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })

// db.connect((err)=>{
//     if(err) throw err;
//     console.log('Kết nối thành công DB');
// })

// module.exports = db;

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Tạo connection pool thay vì một kết nối đơn
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,  // Chờ đợi kết nối nếu tất cả kết nối đều đang sử dụng
    connectionLimit: 10,       // Giới hạn số lượng kết nối tối đa
    queueLimit: 0              // Không giới hạn số lượng truy vấn trong hàng đợi
});

// Kiểm tra kết nối đến MySQL
db.getConnection((err, connection) => {
    if (err) {
        console.error('Lỗi kết nối DB:', err);
        throw err;
    }
    console.log('Kết nối thành công DB');
    connection.release();  // Giải phóng kết nối sau khi kiểm tra
});

module.exports = db;
