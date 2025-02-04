const sql = require('mssql');
//https://documentation.mirasys.com/frequently-asked-questions/faq/how-to-install-ca-certificate-to-windows-10-store#:~:text=Open%20the%20Windows%20Start%20menu,Click%20OK.

let pool;

const getPool = async function() {
    if (!pool) {
        pool = await sql.connect('Server=myggblomster.clqa2ooua2aq.us-east-2.rds.amazonaws.com,1433;Database=myggblomsterDB;User Id=admin;Password=password;trustServerCertificate=true');
    }
    return pool;
}

exports.DAL = {
    getAllUsers: async function() {
        const pool = await getPool();
        let result = await pool.request()
            .query("SELECT * FROM Users");
        return result.recordset;
    },
    getUserById: async function(id) {
        const pool = await getPool();
        let result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM Users WHERE id = @id");
        return result.recordset[0];
    },
    createUser: async function(user) {
        const pool = await getPool();
        let result = await pool.request()
            .input("email", sql.NVarChar, user.email)
            .input("password", sql.NVarChar, user.password)
            .input("isAdmin", sql.Bit, user.isAdmin)
            .query("INSERT INTO Users (email, password, isAdmin) VALUES (@email, @password, @isAdmin)");
        return result;
    },
}
