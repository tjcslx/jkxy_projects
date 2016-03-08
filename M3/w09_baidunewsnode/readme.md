CSS压缩使用的是lessc，命令如下：
```
lessc styles.less styles.min.css --clean-css="--s1 --advanced --compatibility=ie8"
```
JS压缩使用的是YUI Compressor，命令如下：
```
yuicompressor --type js frontend.js -o frontend.min.js --nomunge
yuicompressor --type js backend.js -o backend.min.js --nomunge
```
首先运行``npm install``安装依赖包，然后通过``node app.js``启动REST服务，默认地址为：[地址](http://localhost:3900)，页面部署在Apache服务器上，前端地址为[地址](http://localhost/w09_baidunewsnode)，后端地址为[地址](http://localhost/w09_baidunewsnode/backend.html)。