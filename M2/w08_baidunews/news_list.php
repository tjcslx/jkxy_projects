<?php
    require_once("connect.php");
    $start = $_GET["start"];
    $cat = $_GET["cat"];
    if (connectToDb("baidunews") && isset($start) && isset($cat)) {
        if ($cat == "0") {
            $query = mysql_query("SELECT n1.n_id, n1.n_heading, CONCAT(LEFT(n1.n_content, 10), '…') AS n_abstract, n1.insert_time, do.dno_name FROM news_main n1, d_news_origin do WHERE n1.n_origin = do.dno_id AND n1.n_status = '1' ORDER BY n1.n_id DESC LIMIT ".$start.", 10");
        } else {
            $query = mysql_query("select n1.n_id, n1.n_heading, CONCAT(LEFT(n1.n_content, 10), '…') as n_abstract, n1.insert_time, do.dno_name from news_catsub n2, news_main n1, d_news_origin do where n1.n_id = n2.n_id and n1.n_origin = do.dno_id and n1.n_status = '1' and n2.nc_status = '1' and n2.dnc_id = '".$cat."' ORDER by n1.n_id desc LIMIT ".$start.", 10");
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
                echo "<li><a href=\"news.php?id=".$nId."\" target=\"_blank\"><h3>".$nHeading."</h3>";
                echo "<p>".$nAbstract."</p>";
                echo "<span>".$insertTime."</span>";
                echo "<span class=\"origin\">".$dnoName."</span></a></li>";
            }
        }
    } else {
        echo "false";
    }
?>