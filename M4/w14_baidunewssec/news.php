<?php
    require_once("connect.php");
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>百度新闻</title>
    <!--引入Less预处理器，并利用媒体查询分别导入通用及适配PC端及移动端的Less源文件-->
    <link rel="stylesheet" href="./css/styles.build.css">
</head>

<body>
    <!--头部-->
    <header>
        <div class="top">
            <img src="./img/logo.png" alt="百度新闻" height="46" width="137">
            <ul>
                <li>
                    <a href="#"><strong>新闻</strong></a>
                </li>
                <li>
                    <a href="#">网页</a>
                </li>
                <li>
                    <a href="#">贴吧</a>
                </li>
                <li>
                    <a href="#">知道</a>
                </li>
                <li>
                    <a href="#">音乐</a>
                </li>
                <li>
                    <a href="#">图片</a>
                </li>
                <li>
                    <a href="#">视频</a>
                </li>
                <li>
                    <a href="#">地图</a>
                </li>
                <li>
                    <a href="#">百科</a>
                </li>
                <li>
                    <a href="#">文库</a>
                </li>
            </ul>
            <div class="search">
                <form action="" method="post">
                    <input type="text">
                    <input type="submit" value="百度一下">
                </form>
            </div>
        </div>
    </header>
    <!--头部结束-->
    <!--正文部分-->
    <section class="news">
        <div class="back"></div>
        <?php
            $id = $_GET["id"];
            if (connectToDb() && isset($id)) {
                $mysqli = connectToDb();
                $errmsg = "";
                $query = "SELECT n_heading, n_content, do.dno_name, date_format(n.insert_time, \"%Y年%c月%e日\") as insert_time FROM news_main n, d_news_origin do where n.n_origin = do.dno_id and (n.n_id = ?)";
                $stmt = $mysqli -> prepare($query);
                $stmt -> bind_param("i", $id);
                $stmt -> execute();
                
                $res = $stmt -> get_result();
                while ($row = $res -> fetch_assoc()) {
                    echo "<h1>".$row["n_heading"]."</h1>";
                    echo "<span>字体大小：</span>";
                    echo "<span class=\"big\">大</span>";
                    echo "<span class=\"normal\">中</span>";
                    echo "<span class=\"small\">小</span><br/>";
                    echo "<span>发布日期：".$row["insert_time"]."</span>";
                    echo "<span>来源：".$row["dno_name"]."</span>";
                    echo "<p>".$row["n_content"]."</p>";
                }
                $res -> free();
                $mysqli -> close();
            } else {
                return false;
            }
        ?>
    </section>
    <!--正文部分结束-->
    <!--底部-->
    <footer>
        <span><a href="#">投诉中心</a>京公网安备110000000001号<a href="#">互联网新闻信息服务许可</a>©2015Baidu<a href="#">使用百度前必读</a></span>
        <ul>
            <li>
                <a href="#">意见反馈</a>
            </li>
            <li>
                <a href="#">应用推荐</a>
            </li>
            <li>
                <a href="#">客户端</a>
            </li>
        </ul>
    </footer>
    <!--底部结束-->
    <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <script src="./js/frontend.build.js"></script>
</body>

</html>