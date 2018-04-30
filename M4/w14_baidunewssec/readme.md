index.php文件为前端界面，backend.php文件为后端界面。本次修改如下：

* 将connect.php数据接口文件中的接口由原生mysql改为MySQLi扩展，以实现参数化查询，避免SQL注入攻击；修改的数据接口已通过Python的`sqlmap.py`进行测试，不存在注入问题；
* `removexss.php`文件为过滤XSS的代码，摘自ThinkPHP框架源码；在`connect.php`数据接口文件中，修改了全部返回数据库结果的JSON节点；在`insert.php`及`update.php`中，将通过post方法接收的参数进行了过滤。