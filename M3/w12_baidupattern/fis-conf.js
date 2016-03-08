//将png、jpg、css、less及js文件输出到img、css及js文件夹，其中app.js即自行编写的js文件通过uglify-js插件进行压缩，jQuery对应的js不压缩
fis.match('*.{png,jpg}', {
    release: '/img/$0'
});

fis.match('*.css', {
    release: '/css/$0'
});

fis.match('*.js', {
    release: '/js/$0'
});

fis.match('pattern.js', {
    optimizer: fis.plugin('uglify-js')
});

//css文件进行压缩
fis.match('*.css', {
    optimizer: fis.plugin('clean-css')
});

//css及app.js文件增加指纹
fis.match('*.css', {
    useHash: true
});

fis.match('pattern.js', {
    useHash: true
});

fis.match('::package', {
    spriter: fis.plugin('csssprites')
})

//对css文件进行图片合并
fis.match('*.css', {
    useSprite: true
});