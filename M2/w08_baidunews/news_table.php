<?php
    require_once("connect.php");
    $heading = $_GET["heading"];
    $abstract = $_GET["abstract"];
    $origin = $_GET["origin"];
    $category = $_GET["category"];
    if (connectToDb("baidunews")) {
        if ($heading != "") {
            $rh = " AND n1.n_heading LIKE '%".$heading."%' ";
        } else {
            $rh = "";
        };
        if ($abstract != "") {
            $ra = " AND n1.n_content LIKE '%".$abstract."%' ";
        } else {
            $ra = "";
        };
        if ($origin != "0") {
            $ro = " AND n1.n_origin = '".$origin."' ";
        } else {
            $ro = "";
        };
        if ($category != "0") {
            $rc = " AND n2.dnc_id = '".$category."' ";
        } else {
            $rc = "";
        };
        $query = mysql_query("SELECT DISTINCT n1.n_id, n1.n_heading, CONCAT(LEFT(n1.n_content, 10), '…') AS n_abstract, n1.insert_time, do.dno_name FROM news_catsub n2, news_main n1, d_news_origin do WHERE n1.n_origin = do.dno_id AND n1.n_id = n2.n_id AND n1.n_status = '1' AND n2.nc_status = '1' AND do.status = '1'".$rh.$ra.$ro.$rc."ORDER BY n1.n_id");
        $query_count = mysql_num_rows($query);
            if ($query_count > 0) {
                for ($i = 0; $i < $query_count; $i++) {
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
    } else {
        echo "false";
    }
?>