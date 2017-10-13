/* ----------------------- */
/* REQUIRES */
// express recebe um objeto do framework Express
const express = require('express');

// consign é o responsável pelo mapeamento das rotas, banco de dados, controlers, etc
const consign = require('consign');

// Body parser serve para que o express possa receber e destrinchar dados que chegam via POST
const bodyParser = require('body-parser');

// Validator serve para fazer validações de strings. Por exemplo: isEmpty(), isAlpha(), isEmail() etc
const expressValidator = require('express-validator');

// Moment é para validação de datas
const moment = require('moment');

// Dateformat ajuda a formatar datas
const dateFormat = require('dateformat');

/* ----------------------- */
/* SETS */
// app recebe o template do express para ser utilizado
var app = express();

// Informa para o app do express que a engine de views agora é a o EJS
app.set('view engine', 'ejs');

// Informa o caminho padrão das views (o padrão é './views' mas nesse projeto está em './app/views')
app.set('views', './app/views');

// Permite que moment seja usado em qualquer página EJS
app.locals.moment = moment;
app.locals.dateFormat = dateFormat;

/* ----------------------- */
/* MIDDLEWARES */
// Static é para tornar arquivos na public acessíveis na nossa raiz
app.use(express.static('./app/public'));


// Recebimento de dados via post no formato JSON
app.use(bodyParser.urlencoded({
    extended: true
}));

// Validação de formulário
app.use(expressValidator());


/* ----------------------- */
/* CONSIGN */
consign()
    .include('app/routes') // Mapeia a pasta de rotas usando consign, usando-o as rotas são encontradas automcaticamente, basta criar o arquivo
    .then('config/dbConnection.js') // Adiciona em app a conexão com o banco de dados, assim não precisa chamar a conexão toda vez
    .then('app/models') // Mapeia as models para dentro de app
    .then('app/controllers') // Mapeia as models para dentro de app
    .into(app);

/* ----------------------- */
/* EXPORTS */
module.exports = app;