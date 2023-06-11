const { pool } = require("../database");

const getStudent = async (request, response) => {
  try {
    let sql;
    let values = [];
    if (request.params.student_id == null) {
      sql = "SELECT * FROM students"} 
    else {
      sql = "SELECT * FROM students WHERE student_id = ?";
      values = [request.params.student_id]}

    let [result] = await pool.query(sql, values);
    response.send(result);
  } catch (err) {
    console.log(err);
  }
};

const postStudent = async (request, response) => {
  let respuesta;
  try {
    console.log(request.body);
    let sql =
      "INSERT INTO students (student_id, first_name, last_name, group_id, year) " +
      "VALUES (?, ?, ?, ?, ?)";
    let values = [
      request.body.student_id,
      request.body.first_name,
      request.body.last_name,
      request.body.group_id,
      request.body.year,
    ];
    console.log(sql);
    let [result] = await pool.query(sql, values);
    console.log(result);

    if (result.affectedRows > 0) {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Alumno creado correctamente",
        data: values,
      };
      response.send(respuesta);
    } else {
      respuesta = {
        error: true,
        codigo: 200,
        mensaje: "No se ha podido agregar al alumno",
      };
      response.send(respuesta);
    }
  } catch (err) {
    console.log(err);
  }
};

const putStudent = async (request, response) => {
  try {
    let { student_id, first_name, last_name, group_id, year } = request.body;
    let sql = `UPDATE students SET 
      first_name = ?,
      last_name = ?,
      group_id = ?,
      year = ?
      WHERE student_id = ?`;
    let values = [first_name, last_name, group_id, year, student_id];

    console.log(sql);
    let [result] = await pool.query(sql, values);
    console.log(result);

    if (result.affectedRows > 0) {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Alumno modificado correctamente",
        data: values,
      };
      response.send(respuesta);
    } else {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "El alumno no se ha modificado correctamente",
        data: values,
      }
      response.send(respuesta);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteStudent = async (request, response) => {
  try {
    let { student_id } = request.params;

    let sql = "DELETE FROM students WHERE student_id = ?";
    let values = [student_id];

    console.log(sql);
    let [result] = await pool.query(sql, values);
    console.log(result);

    if (result.affectedRows > 0) {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Alumno eliminado correctamente",
        data: values,
      };
      response.send(respuesta)} 
    else {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Alumno no se ha eliminado correctamente",
        data: values,
      }
      response.send(respuesta);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getStudent, postStudent, deleteStudent, putStudent };
