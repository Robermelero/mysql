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
        
        // let sql = "ALTER TABLE direction DROP COLUMN perro_id";
        // let sql="ALTER TABLE direction ADD COLUMN perro_id INT"
        // let sql = "DROP TABLE direction";
        // let sql ="UPDATE marks SET mark = 0"
        // let sql = "SELECT first_name, last_name From students"
        // let sql = "SELECT * FROM teachers";
        // let sql = "DELETE FROM marks WHERE date < '2013-06-06'"
        let sql = "UPDATE marks SET mark = 5 WHERE mark < 5";
        let [result] = await connection.query(sql);
        console.log("datos borrados");
        console.log(result);

    }
    catch (error)
    {
        console.log(error)
       await connection.end()
    }
}
main();
