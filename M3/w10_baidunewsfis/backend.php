<?php
    require_once("connect.php");
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>百度新闻-后台管理</title>
    <!--导入Bootstrap 3.3.5的CSS样式-->
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="./styles.build.less">
</head>

<body>
    <div class="container">
        <form action="" method="POST" role="form" class="form-inline">
            <legend>新闻查询</legend>
            <div class="form-group">
                <label for="heading">新闻标题</label>
                <input type="text" class="form-control" id="heading" placeholder="新闻标题关键字">
            </div>
            <div class="form-group">
                <label for="abstract">新闻摘要</label>
                <input type="text" class="form-control" id="abstract" placeholder="新闻摘要关键字">
            </div>
            <div class="form-group">
                <label for="origin">新闻来源</label>
                <select name="新闻来源" id="origin" class="form-control">
                    <option value="0" selected="selected">请选择</option>
                </select>
            </div>
            <div class="form-group">
                <label for="category">新闻版块</label>
                <select name="新闻版块" id="category" class="form-control">
                    <option value="0" selected="selected">请选择</option>
                </select>
            </div>
        </form>
        <!--嵌入PHP代码，将数据写入表格中-->
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>标题</th>
                    <th>摘要</th>
                    <th>来源</th>
                    <th>发布时间</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    if (connectToDb("baidunews")) {
                        $query = mysql_query("SELECT n1.n_id, n1.n_heading, CONCAT(LEFT(n1.n_content, 10), '…') AS n_abstract, n1.insert_time, do.dno_name FROM news_main n1, d_news_origin do WHERE n1.n_origin = do.dno_id AND n1.n_status = '1' ORDER BY n1.n_id DESC");
                    };
                    $queryCount = mysql_num_rows($query);
                    if ($queryCount > 0) {
                        for ($i = 0; $i < $queryCount; $i++) {
                            $queryArr = mysql_fetch_assoc($query);
                            $nId = $queryArr["n_id"];
                            $nHeading = $queryArr["n_heading"];
                            $nAbstract = $queryArr["n_abstract"];
                            $insertTime = $queryArr["insert_time"];
                            $dnoName = $queryArr["dno_name"];
                            echo "<tr><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#newsmodal\" data-whatever=\"".$nId."\">".$nId."</a></td><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#newsmodal\" data-whatever=\"".$nId."\">".$nHeading."</a></td><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#newsmodal\" data-whatever=\"".$nId."\">".$nAbstract."</a></td><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#newsmodal\" data-whatever=\"".$nId."\">".$dnoName."</a></td><td><a href=\"#\" data-toggle=\"modal\" data-target=\"#newsmodal\" data-whatever=\"".$nId."\">".$insertTime."</a></td></tr>";
                        }
                    } else {
                        echo "<tr><td colspan=\"5\">查无记录-_-</td></tr>";
                    }
                ?>
            </tbody>
        </table>
        <!--下方为添加按钮，点击该按钮弹出模态窗口进行新闻的添加操作-->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newsmodal" data-whatever="" id="add">添加</button>
        <!--新闻维护模态窗口-->
        <div class="modal fade" id="newsmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">新闻维护</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="newsid">新闻流水号</label>&nbsp;
                            <input type="text" class="form-control" id="newsid" readonly="readonly">
                        </div>
                        <div class="form-group">
                            <label for="newsheading">新闻标题</label>&nbsp;
                            <label class="notify" id="headingnotify"></label>
                            <input type="text" class="form-control" id="newsheading">
                        </div>
                        <div class="form-group">
                            <label for="newscontent">新闻内容</label>&nbsp;
                            <label class="notify" id="contentnotify"></label>
                            <textarea class="form-control" id="newscontent" rows="5" wrap="physical"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="newsorigin">新闻来源</label>&nbsp;
                            <label class="notify" id="originnotify"></label>
                            <select class="form-control" id="newsorigin">
                                <option value="0" selected="selected">请选择</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newscategory">新闻版块</label>&nbsp;
                            <label class="notify" id="categorynotify"></label>
                            <select class="form-control" id="newscategory">
                                <option value="0" selected="selected">请选择</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="close">关闭</button>
                        <button type="button" class="btn btn-danger" id="delete">删除</button>
                        <button type="button" class="btn btn-primary" id="save">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--导入jQuery、Bootstrap及自带JavaScript文件-->
    <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="./backend.build.js"></script>
</body>

</html>