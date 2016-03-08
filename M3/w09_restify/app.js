var restify = require('restify');
var Db = require('mysql-activerecord');
var db = new Db.Adapter({
    server: 'localhost',
    username: 'root',
    password: '',
    database: 'baidunews',
    reconnectTimeout: 2000
});
var access = 'http://localhost';

//取前五张图片，通过接口将其显示在移动端首页
function getFivePhotos(req, res) {
    db.select('news_picsub.n_id, np_id, np_src, n_heading').where({
        n_status: '1',
        np_status: '1'
    }).limit(5).order_by(['news_picsub.n_id desc', 'news_picsub.np_id desc']).join('news_main', 'news_main.n_id = news_picsub.n_id').get('news_picsub', function (err, results, fields) {
        res.setHeader('Access-Control-Allow-Origin', access);
        res.charSet('utf-8');
        res.json(results);
    });
};

//自某一条起，取指定版块或全部版块的下十条新闻
function getNextTenNews(req, res) {
    var start = parseInt(req.params.start);
    var rec = parseInt(req.params.rec);
    var fc = db.select('distinct news_main.n_id, n_heading, CONCAT(LEFT(n_content, 10), \'…\') AS n_abstract, date_format(news_main.insert_time, \"%Y年%c月%e日 %T\") as insert_time, dno_name').join('d_news_origin', 'news_main.n_origin = d_news_origin.dno_id').order_by('news_main.n_id desc');
    if (req.params.heading != '') {
        fc = fc.where('n_heading like \'%' + req.params.heading + '%\'');
    };
    if (req.params.abstract != '') {
        fc = fc.where('n_content like \'%' + req.params.abstract + '%\'');
    };
    if (req.params.origin != '0') {
        fc = fc.where('n_origin', req.params.origin);
    };
    if (rec > 0) {
        fc = fc.limit(rec, start);
    };
    if (req.params.cat == "0") {
        fc.where('n_status', '1').get('news_main', function (err, results, fields) {
            res.setHeader('Access-Control-Allow-Origin', access);
            res.charSet('utf-8');
            res.json(results);
            console.log(err);
        });
    } else {
        fc.join("news_catsub", "news_main.n_id = news_catsub.n_id").where({
            n_status: '1',
            dnc_id: req.params.cat,
            nc_status: '1'
        }).get('news_main', function (err, results, fields) {
            res.setHeader('Access-Control-Allow-Origin', access);
            res.charSet('utf-8');
            res.json(results);
            console.log(err);
        });
    };
};

//根据编号取新闻内容
function getNewsById(req, res) {
    db.select('news_main.n_id, n_heading, n_content, dno_id, dno_name, date_format(news_main.insert_time, \'%Y年%c月%e日\') as insert_time').where({
        n_id: req.params.id,
        n_status: '1',
    }).join('d_news_origin', 'news_main.n_origin = d_news_origin.dno_id').get('news_main', function (err, results, fields) {
        res.setHeader('Access-Control-Allow-Origin', access);
        res.charSet('utf-8');
        res.json(results);
        console.log(err);
    });
}

//取新闻来源代码
function getNewsOrigin(req, res) {
    db.select('dno_id, dno_name').where({
        status: '1'
    }).get('d_news_origin', function (err, results, fields) {
        res.setHeader('Access-Control-Allow-Origin', access);
        res.charSet('utf-8');
        res.json(results);
    });
};

//向数据库中插入新闻记录，插入主表news_main。
function insertNews(req, res) {
    var message;
    db.insert('news_main', {
        n_heading: req.params.n_heading,
        n_content: req.params.n_content,
        n_publisher: '01',
        n_origin: req.params.n_origin
    }, function (err, info) {
        res.setHeader('Access-Control-Allow-Origin', access);
        if (!err) {
            message = '新闻添加成功！';
        } else {
            message = '新闻添加失败：' + err;
        };
        res.charSet('utf-8');
        res.json({
            msg: message
        });
    });
};

//更新数据库中的新闻记录，更新主表news_main。
function updateNews(req, res) {
    db.where({
        n_id: req.params.id
    }).update('news_main', {
        n_heading: req.params.n_heading,
        n_content: req.params.n_content,
        n_origin: req.params.n_origin
    }, function (err) {
        res.setHeader('Access-Control-Allow-Origin', access);
        res.charSet('utf-8');
        if (!err) {
            res.json({
                msg: "更新成功！"
            });
        } else {
            res.json({
                msg: "更新失败！：" + err
            });
        };
    })
};

//删除数据库中的新闻记录，将主表news_main中的对应记录有效标志改为0。
function updateNewsToDisabled(req, res) {
    db.where(
        'n_id', req.params.id
    ).update('news_main', {
        n_status: '0'
    }, function (err) {
        console.log(err);
        res.setHeader('Access-Control-Allow-Origin', access);
        res.charSet('utf-8');
        if (!err) {
            res.json({
                msg: "删除成功！"
            });
        } else {
            res.json({
                msg: "删除失败！：" + err
            });
        };
    });
};

var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get('/newslist/:heading/:abstract/:origin/:cat/:start/:rec', getNextTenNews);
server.get('/photos/', getFivePhotos);
server.get('/news/:id', getNewsById);
server.get('/deletenews/:id', updateNewsToDisabled);
server.get('/origin/', getNewsOrigin);
server.post('/deletenews', updateNewsToDisabled);
server.post('/updatenews', updateNews);
server.post('/insertnews', insertNews);

server.listen(3900, function () {
    console.log('%s listening at %s', server.name, server.url);
});