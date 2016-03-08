//将png、jpg、css、less及js文件输出到img、css及js文件夹，其中.build.js即自行编写的js文件通过uglify-js插件进行压缩，min.js不压缩
fis.match('*.{png,jpg}', {
    release: '/img/$0'
});

fis.match('*.{css,less}', {
    release: '/css/$0'
});

fis.match('*.js', {
    release: '/js/$0'
});

fis.match('*.build.js', {
    optimizer: fis.plugin('uglify-js')
});

// 构建.less文件，完成后将后缀名改为.css，并进行压缩
fis.match('*.less', {
    parser: fis.plugin('less'),
    optimizer: fis.plugin('clean-css'),
    rExt: '.css'
});

//后缀名为.build.css进行压缩，min.css不压缩
fis.match('*.build.css', {
    optimizer: fis.plugin('clean-css')
});

//将除了Markdown之外的全部源文件推送至Apache服务器
fis.match('*.{css,js,less,php,png}', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://localhost/receiver.php',
        to: 'C:/Application/Work/xampp/htdocs/' //测试Apache服务器的htdocs目录
    })
});