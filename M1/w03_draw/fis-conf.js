// 将css及less文件输出到css文件夹
fis.match('*.less', {
    release: '/$0'
});

// 构建.less文件，完成后将后缀名改为.css，并进行压缩
fis.match('*.less', {
    parser: fis.plugin('less'),
    optimizer: fis.plugin('clean-css'),
    rExt: '.css'
});