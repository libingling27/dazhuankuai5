const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json()); // 增加JSON解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// 注册用户接口
app.post('/users', async (req, res) => {
  const { username, email } = req.body;
  try {
    // 明确使用INSERT语句
    const [result] = await db.query('INSERT INTO users (username, email) VALUES (?,?)', [username, email]);
    res.status(201).json({ id: result.insertId, username, email });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).send({error: '插入用户失败'});
  }
});

// 查询用户信息接口
app.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({error: '查询用户失败'});
  }
});

// 提交分数接口
app.post('/scores', async (req, res) => {
  const { user_id, score, level } = req.body;
  try {
    const [result] = await db.query('INSERT INTO scores (user_id, score, level, game_date) VALUES (?,?,?,NOW())', [user_id, score, level]);
    res.status(201).json({ id: result.insertId, user_id, score, level });
  } catch (error) {
    console.error('Error inserting score:', error);
    res.status(500).send({error: '插入分数失败'});
  }
});

// 查询用户得分历史接口
app.get('/scores/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM scores WHERE user_id = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).send({error: '查询得分失败'});
  }
});

app.listen(8081, ()=> {
  console.log("服务器启动成功: http://127.0.0.1:8081");
});