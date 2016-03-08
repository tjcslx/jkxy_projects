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
    <!-- <link rel="stylesheet/less" href="css/styles_common.less"> -->
    <!-- <link rel="stylesheet/less" href="css/styles_pc.less" media="screen and (min-width: 415px)"> -->
    <!-- <link rel="stylesheet/less" href="css/styles_mobile.less" media="screen and (max-width: 414px)"> -->
    <!-- <link rel="stylesheet/less" href="css/styles.less"> -->
    <!-- <script src="js/less.min.js"></script> -->
    <link rel="stylesheet" href="css/styles.min.css">
</head>

<body>
    <!--头部，PC版为百度图标、主菜单栏、搜索框及新闻栏目，手机版为百度图标及新闻栏目-->
    <header>
        <div class="top">
            <img src="img/logo.png" alt="百度新闻" height="46" width="137">
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
        <nav>
            <ul>
                <li class="active">
                    <a href="#">首页</a>
                </li>
                <li>
                    <a href="#">百家</a>
                </li>
                <li>
                    <a href="#">财经</a>
                </li>
                <li>
                    <a href="#">娱乐</a>
                </li>
                <li>
                    <a href="#">体育</a>
                </li>
                <li>
                    <a href="#">互联网</a>
                </li>
                <li>
                    <a href="#">时尚</a>
                </li>
                <li>
                    <a href="#">汽车</a>
                </li>
                <li>
                    <a href="#">传媒</a>
                </li>
                <li>
                    <a href="#">个性推荐</a>
                </li>
                <li>
                    <a href="#">国内</a>
                </li>
                <li>
                    <a href="#">国际</a>
                </li>
                <li>
                    <a href="#">军事</a>
                </li>
                <li>
                    <a href="#">社会</a>
                </li>
                <li>
                    <a href="#">房产</a>
                </li>
                <li>
                    <a href="#">视频</a>
                </li>
                <li>
                    <a href="#">名站</a>
                </li>
                <li>
                    <a href="#">更多版块</a>
                </li>
                <li class="expand">
                    ∨
                </li>
            </ul>
        </nav>
    </header>
    <!--头部结束-->
    <!--正文部分，包括滚动图、新闻标题及下方的更多按钮，PC版与手机版显示内容相同-->
    <section class="index">
        <div class="back"></div>
        <div class="jcarousel-wrapper">
            <div class="jcarousel">
                <ul>
                    <?php
                    if (connectToDb("baidunews")) {
                        $query = mysql_query("SELECT n2.n_id, n2.np_id, n2.np_src FROM news_picsub n2, news_main n1 WHERE n1.n_id = n2.n_id AND n1.n_status = '1' AND n2.np_status = '1' ORDER BY n2.n_id, n2.np_id DESC LIMIT 5");
                        $queryCount = mysql_num_rows($query);
                        for ($i = 0; $i < $queryCount; $i++) {
                            $queryArr = mysql_fetch_assoc($query);
                            $npSrc = $queryArr["np_src"];
                            echo "<li><img src=\"".$npSrc."\"></li>";
                        }
                    }
                ?>
                </ul>
            </div>
            <a href="#" class="jcarousel-control-prev">&lsaquo;</a>
            <a href="#" class="jcarousel-control-next">&rsaquo;</a>
        </div>
        <ul>
            <?php
            if (connectToDb("baidunews")) {
                $query = mysql_query("SELECT n1.n_id, n1.n_heading, CONCAT(LEFT(n1.n_content, 10), '…') AS n_abstract, n1.insert_time, do.dno_name FROM news_main n1, d_news_origin do WHERE n1.n_origin = do.dno_id AND n1.n_status = '1' ORDER by n1.n_id DESC LIMIT 10");
                $queryCount = mysql_num_rows($query);
                for ($i = 0; $i < $queryCount; $i++) {
                    $queryArr = mysql_fetch_assoc($query);
                    $nId = $queryArr["n_id"];
                    $nHeading = $queryArr["n_heading"];
                    $nAbstract = $queryArr["n_abstract"];
                    $insertTime = $queryArr["insert_time"];
                    $dnoName = $queryArr["dno_name"];
                    echo "<li><a href=\"news.php?id=".$nId."\" target=\"_blank\"><h3>".$nHeading."</h3>";
                    echo "<p>".$nAbstract."</p>";
                    echo "<span>".$insertTime."</span>";
                    echo "<span class=\"origin\">".$dnoName."</span></a></li>";
                }
            }
        ?>
        </ul>
        <div class="more">
            <button class="more">更多</button>
        </div>
    </section>
    <!--正文部分结束-->
    <!--底部，PC版显示版权信息，手机版显示三个链接-->
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
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/jquery.jcarousel.min.js"></script>
    <script src="js/jcarousel.basic.js"></script>
    <script src="js/frontend.js"></script>
</body>

</html>