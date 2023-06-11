const { pool } = require("../database");

const getMedia = async (request, response) => {
  try {
    let studentId = request.params.student_id;
    let sql = `SELECT s.first_name, s.last_name, AVG(mark) AS media
               FROM marks AS m 
               INNER JOIN students AS s ON (m.student_id = s.student_id)
               WHERE s.student_id = ?`;
    let [result] = await pool.query(sql, studentId);
    console.log(result)

    if (result.length === 0) {
      response.send(`No se encontraron notas para el alumno/a ${studentId}`);
    } else {
      let media = result[0].media;
      let name= result[0].first_name;
      let surname = result[0].last_name;
      response.send(`La nota media del alumno/a ${name} ${surname} es ${media}`);
    }
  } catch (err) {
    console.log(err);
    response.send(`Ocurrió un error al obtener la nota media del alumno/a ${studentId}`);
  }
};
const getApuntadas = async (request, response) => {
    try {
      let studentId = request.params.student_id;
      let sql = `SELECT s.first_name, s.last_name, su.title
                 FROM students AS s
                 INNER JOIN marks AS m ON (m.student_id = s.student_id)
                 INNER JOIN subjects AS su ON (su.subject_id = m.subject_id)
                 WHERE s.student_id = ?`;
      let [result] = await pool.query(sql, studentId);
      console.log(result)
  
      if (result.length === 0) {
        response.send(`No se encontraron asignaturas para el alumno/a ${studentId}`);
      } else {
        
        let asignatura = result.map(subject => subject.title).join(',');
        let name= result[0].first_name;
        let surname = result[0].last_name;
        response.send(`Las asignaturas en que esta apuntado el 
        alumno/a ${name} ${surname} son: ${asignatura}`);
      }
    } catch (err) {
      console.log(err);
      response.send(`Ocurrió un error al obtener las asignaturas del alumno/a ${studentId}`);
    }
  };
  const getDatosTotales = async (request, response) => {
    try {
      let sql = `SELECT s.first_name, s.last_name, su.title
                 FROM students AS s
                 INNER JOIN marks AS m ON (m.student_id = s.student_id)
                 INNER JOIN subjects AS su ON (su.subject_id = m.subject_id)`;
      let [result] = await pool.query(sql);
      console.log(result)
  
      if (result.length === 0) {
        response.send(`No se encontraron asignaturas para ningún alumno/a`);
      } else {
        
        let asignaturas = result.map(student =>
           `${student.first_name}
            ${student.last_name}
            ${student.title}` 
        );
        response.send(`Las asignaturas a las que estan apuntados los alumnos/as son:`+ asignaturas.join(','));
      }
    } catch (err) {
      console.log(err);
      response.send(`Ocurrió un error al obtener las asignaturas de los alumnos/as`);
    }
  };
  const getImpartidas = async (request, response) => {
    try {
      let teacherId = request.params.teacher_id;
      let sql = `SELECT s.first_name, s.last_name, su.title
                 FROM teachers AS s
                 INNER JOIN subject_teacher AS m ON (m.teacher_id = s.teacher_id)
                 INNER JOIN subjects AS su ON (su.subject_id = m.subject_id)
                 WHERE s.teacher_id = ?`;
      
      let [result] = await pool.query(sql, teacherId);
      console.log(result)
  
      if (result.length === 0) {
        response.send(`No se encontraron asignaturas para el profesor/a ${teacherId}`);
      } else {
        
        let asignatura = result.map(subject => subject.title).join(',');
        let name= result[0].first_name;
        let surname = result[0].last_name;
        response.send(`Las asignaturas imparte el profesor/a ${name} ${surname} son: ${asignatura}`);
      }
    } catch (err) {
      console.log(err);
      response.send(`Ocurrió un error al obtener las asignaturas del profesor/a ${teacherId}`);
    }
  };
  const getImpartidasTotales = async (request, response) => {
    try {
      let sql = `SELECT s.first_name, s.last_name, su.title
                 FROM teachers AS s
                 INNER JOIN subject_teacher AS m ON (m.teacher_id = s.teacher_id)
                 INNER JOIN subjects AS su ON (su.subject_id = m.subject_id)`;
      let [result] = await pool.query(sql);
      console.log(result)
  
      if (result.length === 0) {
        response.send(`No se encontraron asignaturas para ningún profesor/a`);
      } else {
        
        let asignaturas = result.map(teacher =>
           `${teacher.first_name}
            ${teacher.last_name}
            ${teacher.title}` 
        );
        response.send(`Las asignaturas que impartenlos profesores/as son:`+ asignaturas.join(','));
      }
    } catch (err) {
      console.log(err);
      response.send(`Ocurrió un error al obtener las asignaturas de los profesores/as`);
    }
  };
module.exports = { getMedia, getApuntadas, getDatosTotales, getImpartidas, getImpartidasTotales};

