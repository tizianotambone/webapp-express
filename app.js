const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT || 3000;


console.log('FE_APP origin consentita:', process.env.FE_APP);


app.use(cors({
  origin: process.env.FE_APP
}));

app.use(express.json());
app.use(express.static('public'));

const filmRouter = require('./router/router');
app.use('/api/movies', filmRouter);

app.get('/', (req, res) => {
  res.send("welcome to my movie list");
});

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
