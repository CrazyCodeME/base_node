const mysql = require('mysql');
const db = mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'123456',
    database:'my_db_01'
});
// 添加错误监听
db.on('error', function(err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed unexpectedly.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.');
    }
});
module.exports = db;