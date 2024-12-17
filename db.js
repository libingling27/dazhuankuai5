const mysql = require('mysql2');


// 创建与数据库的连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ll20040614',
  database: 'brick_break_game'
});
 
// 连接到数据库
connection.connect((err) => {
  if (err) throw err;
  console.log('连接数据库成功');
});

module.exports = connection.promise();