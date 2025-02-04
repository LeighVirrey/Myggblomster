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
    getUsers: async function() {
        const pool = await getPool();
        let result = await pool.request()
            .query("SELECT * FROM Users");
        return result.recordset;
    },
    getUserByUserId: async function(id) {
        const pool = await getPool();
        let result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM Users WHERE id = @id");
        return result.recordset[0];
    },
    getUserByEmail: async function(email) {
        const pool = await getPool();
        let result = await pool.request()
            .input("email", sql.NVarChar, email)
            .query("SELECT * FROM Users WHERE email = @email");
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
    updateUser: async function(user) {
        const pool = await getPool();
        let result = await pool.request()
            .input("id", sql.Int, user.id)
            .input("email", sql.NVarChar, user.email)
            .input("password", sql.NVarChar, user.password)
            .input("isAdmin", sql.Bit, user.isAdmin)
            .query("UPDATE Users SET email = @email, password = @password, isAdmin = @isAdmin WHERE id = @id");
        return result;
    },
    deleteUser: async function(id) {
        const pool = await getPool();
        let result = await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Users WHERE id = @id");
        return result;
    },
    getRAR: async function() {
        const pool = await getPool();
        let result = await pool.request()
            .query("SELECT * FROM RAR");
        return result.recordset;
    },
    getMovieByMovieId: async function(movieId) {
        const pool = await getPool();
        let result = await pool.request()
            .input("movieId", sql.NVarChar, movieId)
            .query("SELECT * FROM RAR WHERE movieId = @movieId");
        return result.recordset;
    },
    getReviewsByUserId: async function(userId) {
        const pool = await getPool();
        let result = await pool.request()
            .input("userId", sql.NVarChar, userId)
            .query("SELECT * FROM RAR WHERE userId = @userId");
        return result.recordset;
    },
    createRAR: async function(RAR) {
        const pool = await getPool();
        let result = await pool.request()
            .input("movieId", sql.BigInt, RAR.movieId)
            .input("userId", sql.BigInt, RAR.userId)
            .input("starRating", sql.Decimal, RAR.starRating)
            .input("movieReview", sql.NVarChar, RAR.movieReview)
            .query("INSERT INTO RAR (movieId, userId, starRating, movieReview) VALUES (@movieId, @userId, @starRating, @movieReview)");
        return result;
    },

    updateRAR: async function(RAR) {
        const pool = await getPool();
        let result = await pool.request()
            .input("id", sql.Int, RAR.id)
            .input("movieId", sql.NVarChar, RAR.movieId)
            .input("userId", sql.NVarChar, RAR.userId)
            .input("starRating", sql.Decimal, RAR.starRating)
            .input("movieReview", sql.NVarChar, RAR.movieReview)
            .query("UPDATE RAR SET movieId = @movieId, userId = @userId, starRating = @starRating, movieReview = @movieReview WHERE id = @id");
        return result;
    },
    deleteRAR: async function(id) {
        const pool = await getPool();
        let result = await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM RAR WHERE id = @id");
        return result;
    },
}
