首先运行`w09_restify`中的`npm install`安装依赖包mysql-activerecord、restify以及pm2，然后运行

`chmod +x pm2.sh & ./pm2.sh`

为脚本文件增加可执行权限并运行脚本，启动REST服务，默认地址为：[地址](http://localhost:3900)，页面部分为`w09_baidunewsnode`文件夹，部署在Apache服务器上，前端地址为[地址](http://localhost/w09_baidunewsnode)，后端地址为[地址](http://localhost/w09_baidunewsnode/backend.html)，运行前需要首先在phpMyAdmin中导入`sql\source.sql.zip`文件建立数据库。