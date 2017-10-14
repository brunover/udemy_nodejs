module.exports.formulario_inclusao = function (application, req, res) {
    res.render('admin/formulario_inclusao', {
        validacao: '',
        noticia: ''
    });
};

module.exports.noticias_salvar = function (application, req, res) {
    // BodyParser recebe os dados do formulário e cria um objeto no formato JSON
    var noticia = req.body;

    // Importa moment aqui para fazer validação de datas
    var moment = require('moment');
    
    // Vai tratar as informações do form com o Express Validator
    req.assert('titulo', 'Título não pode ficar em branco').notEmpty();
    req.assert('resumo', 'Resumo não pode ficar em branco').notEmpty();
    req.assert('resumo', 'Resumo deve ter entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'Você deve informar o nome do autor').notEmpty();
    req.assert('data_noticia', 'Você deve informar a data da notícia').notEmpty();
    req.assert('noticia', 'O conteúdo da notícia não pode ficar em branco').notEmpty();

    // Cria um objeto JSON que vai conter as mensagens de erro dos campos
    var validationErrors = req.validationErrors();

    // Checa se a data informada está num formato válido de "ano-mês-dia"
    var isValidDate = moment(noticia.data_noticia, "YYYY-MM-DD").isValid();

    // Se a data não é válida acrescenta no JSON de validationErros a mensagem 
    // de erro pois ele retornará para o formulário para mostrar o que houve
    if (!isValidDate) {
        validationErrors.push({
            location: 'body',
            param: 'data_noticia',
            msg: 'A data da notícia deve estar no formato AAAA-MM-DD',
            value: ''
        });
    }

    if (validationErrors) {
        // Se algum erro ocorreu, renderiza "formulario_inclusao.ejs" com os erros em questão
        res.render('admin/formulario_inclusao', {
            validacao: validationErrors,
            noticia: noticia
        });

    } else {
        // Se deu tudo certo, salva os dados no banco
        var connection = application.config.dbConnection();

        var noticiasDAO = new application.app.models.NoticiasDAO(connection);

        noticiasDAO.salvarNoticia(noticia, function (error, result) {
            res.redirect('/noticias');
        });
    }
};