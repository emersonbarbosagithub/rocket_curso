const express = require('express'); //definindo o Express
var cors = require('cors');
const bodyParser = require('body-parser'); //importando o bodyParser

const app = express(); //criando aplicaçao

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);
//require('./app/controllers/authController')(app);
//require('./app/controllers/alunoController')(app);

app.listen(process.env.PORT || 3001);