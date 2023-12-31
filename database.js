const dotenv = require("dotenv");
dotenv.config();
const sql = require("mysql2");

const pool = sql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

const getNotes = async () => {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;
};

const getNote = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM notes WHERE id=?`, [id]); //=> Prepared Statements
  //why question mark because from frontend it could be a false value so save from sql injections we send incomplete query and try to send the data separately.
  return rows;
};

const createNote = async (title, content) => {
  await pool.query(`INSERT INTO notes(title,content) VALUES(?,?)`, [
    title,
    content,
  ]);
};

const deleteNote = async (id) => {
  await pool.query(`DELETE FROM notes WHERE id=?`, [id]);
};

const updateNote = async (id) => {
  const [rows] = await pool.query(
    `UPDATE notes SET title="My New Updated Note" WHERE id=?`,
    [id]
  );
  return rows;
};

module.exports = { getNotes, getNote, createNote, deleteNote, updateNote };
