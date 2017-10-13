module.exports.noticias = function (application, req, res) {
    // Guarda a conexão com mysql que vem de 'config/dbConnection.js'
    var connection = application.config.dbConnection();

    var noticiasDAO = new application.app.models.NoticiasDAO(connection);

    noticiasDAO.getNoticias(function (error, result) {
        res.render('noticias/noticias', {
            noticias: result
        });
    });
};


module.exports.noticia = function (application, req, res) {
    // Guarda a conexão com mysql que vem de 'config/dbConnection.js'
    var connection = application.config.dbConnection();

    var id_noticia = 0;

    // req.query contêm possíveis parâmetros que chegaram pela URL
    // portanto, aqui ele checa se id_noticia chegou, se sim
    // atribui-o dentro de 'id_noticia'
    if (req.query.hasOwnProperty('id_noticia')) {
        id_noticia = req.query.id_noticia;
    }

    var noticiasDAO = new application.app.models.NoticiasDAO(connection);

    noticiasDAO.getNoticia(id_noticia, function (error, result) {
        res.render('noticias/noticia', {
            noticia: result
        });
    });
}