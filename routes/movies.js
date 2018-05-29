

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//-----------------------------------mySQL Connection------------------------

const db = mysql.createConnection({

    host: 'itgbackendhiring.mysql.database.azure.com',
    user: 'nfeliciano@itgbackendhiring',
    password: 'CoughSyrup123!',
    database: 'backend_testing'

});

db.connect((err) =>{
    if(err) throw err;
    console.log('MySql Connected');
});

//----------------------------------Query Endpoints------------------------------

router.get('/', (req, res) => {

    // Get movies by searching titles
    if(req.query.search)
    {
        let search = req.query.search;
        let sql = `SELECT * FROM movies WHERE title like '%${search}%'`;
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results);
        });
    }

    // Get movies by year range 
    else if(req.query.start && req.query.end)
    {
        let start = req.query.start;
        let end = req.query.end;
        let sql = `SELECT * FROM movies WHERE year >='${start}' AND year <= '${end}'`;
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results);
        });
    }

    //Get all movies from db
    else
    {
        let sql = 'SELECT * FROM movies';
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results);
        });
    }  
});

//------------------------------------Add Movie Endpoint---------------------------------

router.post('/', (req, res) => {
    let newMovie = {
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        genre: req.body.genre
    };

    let insertSql = 'INSERT INTO movies SET ?';
    let insertQuery = db.query(insertSql, newMovie, (err, result) => {
        if (err) throw err;
    });

    let sql = 'SELECT id, title, year, director, genre FROM movies ORDER BY id DESC LIMIT 1';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
        console.log(result);
    });
});

module.exports = router;