import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import morgan from 'morgan'


const app = express()
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'anime-api'
})


// Middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


app.get('/api/animes', (req, res) => {
    conn.query('SELECT * FROM animes', (err, results) => {
        results.length === 0 ? res.status(404).json({error: "No movies found"}) : res.json(results)
    })
})


app.get('/api/animes/:animeName', (req, res) => {
    const { animeName } = req.params
    conn.query('SELECT * FROM animes WHERE nombre_norm = ?', animeName, (err, result) => {
        result.lenght === 0 ? res.status(404).json({error: `Anime width name ${animeName} was not found`}) : res.json(result[0])
    })
})


app.listen(5000, () => console.log('Server listenning on http://localhost:5000'))