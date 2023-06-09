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
                database: "museum"
            });
        console.log("conexion correcta");

        // let sql = `SELECT p.name, p.storage_type, pr.return_date, e.name, e.last_name, e.email
        // FROM pieces AS p
        // INNER JOIN loans AS pr ON (p.piece_id = pr.piece_id)
        // INNER JOIN propietary AS e ON (e.propietary_id = pr.propietary_id)
        // where p.format = 'on_loan'`
        
        let sql = `SELECT location_type, COUNT(location_type) AS total
        FROM pieces AS p
        GROUP BY p.location_type
        ORDER BY total DESC`
        
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