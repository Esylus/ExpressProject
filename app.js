const express = require('Express');
const cors = require('cors');
const bodyParser = require('body-parser'); 

const app = express();
const port = 5000;

// Route
const movies = require('./routes/movies');

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/movies', movies);


app.get('/', (req, res) => {
    res.send('Found the server');
});

app.listen(port, ()=>{
    console.log('Server started');
});