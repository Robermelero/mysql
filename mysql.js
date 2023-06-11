const mysql = require("mysql2/promise");

async function main()
{
    try
    {
        let connection = await mysql.createConnection(
            {
                host: "localhost",
                user: "root",
                password: "administrador",
                database: "coles"
            });
        console.log("conexion correcta");
         /////////////////// DIA 1 ////////////////
        // let sql = "ALTER TABLE direction DROP COLUMN perro_id";
        // let sql="ALTER TABLE direction ADD COLUMN perro_id INT"
        // let sql = "DROP TABLE direction";
        // let sql ="UPDATE marks SET mark = 0"
        // let sql = "SELECT first_name, last_name From students"
        // let sql = "SELECT * FROM teachers";
        // let sql = "DELETE FROM marks WHERE date < '2013-06-06'"
        // let sql = "UPDATE marks SET mark = 5 WHERE mark < 5";

        /////////////////////// DIA 2 //////////////////////////////////

        // let sql = "SELECT AVG(mark) FROM marks WHERE subject_id = 1";
        // let sql = "SELECT COUNT(*) FROM students";
        // let sql = "SELECT * FROM groupis";
        // let sql = "DELETE FROM marks WHERE mark>5 AND (date <= '2022-12-31' AND date >= '2022-01-01')";
        // let sql="ALTER TABLE students ADD COLUMN year INT";
        // let sql="UPDATE students SET year = 2022"; 
        // let sql = "SELECT * FROM students WHERE year = 2023";
        // let sql = "SELECT subject_id, COUNT(*) AS profes FROM subject_teacher group by subject_id";
        // let sql = "SELECT student_id, mark FROM marks WHERE student_id BETWEEN 1 AND 20 OR (mark > 8 AND date BETWEEN '2022-01-01' AND '2022-12-31')";
        // let sql = "SELECT subject_id, AVG(mark) From marks WHERE date BETWEEN '2022-06-06' AND '2023-06-07' group by subject_id";
        // let sql = "SELECT student_id, AVG(mark) From marks WHERE date BETWEEN '2022-06-06' AND '2023-06-07' group by student_id";
        
        //////////////////////// DIA 3 ////////////////////////////

        
        // let sql = "SELECT first_name, last_name, title FROM students AS ti INNER JOIN marks AS mi ON (ti.student_id = mi.student_id) INNER JOIN subjects AS si ON (si.subject_id = mi.subject_id) "
        // let sql = "SELECT first_name, last_name, title FROM teachers AS ti INNER JOIN subject_teacher AS mi ON (ti.teacher_id = mi.teacher_id) INNER JOIN subjects AS si ON (si.subject_id = mi.subject_id) "
        let sql =`SELECT li.subject_id, title, si.first_name, si.last_name, COUNT(student_id)  FROM students AS a
        INNER JOIN groupis AS ti ON  (a.group_id = ti.group_id)
        INNER JOIN subject_teacher AS mi ON (ti.group_id = mi.group_id) 
        INNER JOIN teachers AS si ON (si.teacher_id = mi.teacher_id)
        INNER JOIN subjects AS li ON (mi.subject_id = li.subject_id)
        group by subject_id`
        
        let [result] = await connection.query(sql);
        console.log("datos obtenidos");
        console.log(result);

    }
    catch (error)
    {
        console.log(error)
       await connection.end()
    }
}
main();
