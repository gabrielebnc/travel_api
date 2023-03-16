const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs');
const { Pool } = require('pg')
//constants and json
const port = process.env.PORT || 8080;
const places = JSON.parse(fs.readFileSync('./places.json'));
//express
const express = require("express")
const app = express()

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

app.get('', (req, res)=>{
    res.statusCode = 200;
    res.send('go to /places!');
})

app.get('/places', (req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(places)
})

//gets all the users id existing in the database (useless atm)
app.get('/users', (req,res)=>{
    res.statusCode = 200;
    pool.query('SELECT * from users', (err,result)=>{
        res.json(result.rows)
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })

