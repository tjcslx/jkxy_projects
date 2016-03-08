<?php
    require_once("connect.php");

    if (connectToDb("baidunews")) {
        $id = $_GET["id"];
        $col = $_GET["col"];
        $query = mysql_query("SELECT n1.n_id, n1.n_heading, n1.n_content, n1.n_origin, n2.dnc_id FROM news_catsub n2, news_main n1 WHERE n1.n_id = n2.n_id AND n1.n_status = '1' AND n2.nc_status = '1' AND n1.n_id = '".$id."'");
        $queryCount = mysql_num_rows($query);
        if ($queryCount == 0) {
            if (($col == "n_origin") || ($col == "dnc_id")) {
                echo "0";
            };
            return false;
        } else {
            $queryArr = mysql_fetch_assoc($query);
            $queryCol = $queryArr[$col];
            echo $queryCol;
            return true;
        }
    } else {
        return false;
    };
?>