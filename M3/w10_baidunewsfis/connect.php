<?php
    require("config.php");
    
    //连接数据库函数
	function connectToDb() {
		$connect = mysql_connect(MYSQL_ADDRESS, MYSQL_USERNAME, MYSQL_PASSWORD);
    	if ($connect) {
    		mysql_query("set names 'utf8'");
    		mysql_select_db(DATABASE, $connect);
        	return true;
    	} else {
    		return false;
    	}
	};

    //获取新闻来源代码表，返回JSON形式的数据，下同。
    function getOriginDimension() {
        if (connectToDb()) {
            header("Content-type:application/json;charset=utf-8");
            $query = mysql_query("SELECT dno_id, dno_name FROM d_news_origin WHERE status = '1'");
            $queryCount = mysql_num_rows($query);
            if ($queryCount == 0) {
                return false;
            } else {
                $arr = array();
                while ($row = mysql_fetch_array($query)) {
                    array_push($arr, array("dno_id" => $row["dno_id"], "dno_name" => $row["dno_name"]));
                };
                echo json_encode($arr);
                return true;
            };
        } else {
            return false;
        };
    };

    //获取新闻版块代码表。
    function getCategoryDimension() {
        if (connectToDb()) {
            header("Content-type:application/json;charset=utf-8");
            $query = mysql_query("SELECT dnc_id, dnc_name FROM d_news_category WHERE status = '1'");
            $queryCount = mysql_num_rows($query);
            if ($queryCount == 0) {
                return false;
            } else {
                $arr = array();
                while ($row = mysql_fetch_array($query)) {
                    array_push($arr, array("dnc_id" => $row["dnc_id"], "dnc_name" => $row["dnc_name"]));
                };
                echo json_encode($arr);
                return true;
            };
        } else {
            return false;
        };
    };

    //获取新闻列表。
    function getNews($heading, $abstract, $origin, $category, $start, $num) {
        if (connectToDb()) {
            $arr = array();
            header("Content-type:application/json;charset=utf-8");
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
            if ($num != 0) {
                $rl = " LIMIT ".$start.", ".$num;
            } else {
                $rl = "";
            };
            $query = mysql_query("SELECT DISTINCT n1.n_id, n1.n_heading, CONCAT(LEFT(n1.n_content, 10), '…') AS n_abstract, n1.insert_time, do.dno_name FROM news_catsub n2, news_main n1, d_news_origin do WHERE n1.n_origin = do.dno_id AND n1.n_id = n2.n_id AND n1.n_status = '1' AND n2.nc_status = '1' AND do.status = '1'".$rh.$ra.$ro.$rc." ORDER BY n1.n_id DESC ".$rl);
            $queryCount = mysql_num_rows($query);
            if ($queryCount != 0) {
                while ($row = mysql_fetch_array($query)) {
                    array_push($arr, array("n_id" => $row["n_id"], "n_heading" => $row["n_heading"], "n_abstract" => $row["n_abstract"], "insert_time" => $row["insert_time"], "dno_name" => $row["dno_name"]));
                };
            };
            echo json_encode($arr);
            return $queryCount;
        } else {
            return false;
        };
    };

    //获取单条新闻。
    function getSingleNews($id) {
        $arr = array();
        if (connectToDb()) {
            header("Content-type:application/json;charset=utf-8");
            $query = mysql_query("SELECT n.n_id, n_heading, n_content, n.n_origin, do.dno_name, date_format(n.insert_time, \"%Y年%c月%e日\") as insert_date, date_format(n.insert_time, \"%Y年%c月%e日 %T\") as insert_time, dnc_id FROM news_catsub c, news_main n, d_news_origin do where n.n_id = c.n_id AND n.n_origin = do.dno_id AND n.n_id = '".$id."'");
            $queryCount = mysql_num_rows($query);
            if ($queryCount > 0) {
                while ($row = mysql_fetch_array($query)) {
                    array_push($arr, array("n_id" => $row["n_id"], "n_heading" => $row["n_heading"], "n_content" => $row["n_content"], "n_origin" => $row["n_origin"], "dno_name" => $row["dno_name"], "insert_date" => $row["insert_date"], "insert_time" => $row["insert_time"], "dnc_id" => $row["dnc_id"]));
                };
            };
            echo json_encode($arr);
        } else {
            echo "false";
        }
    };

    //向数据库中插入新闻记录，分别插入主表news_main及子表news_catsub，主表插入操作完成后，取出插入记录的ID并保存至id变量，然后插入子表。
    function insertNews($heading, $content, $origin, $category) {
        $errmsg = "";
        
        if (connectToDb()) {
            header("Content-type:application/json;charset=utf-8");
            $query = mysql_query("INSERT INTO news_main (n_heading, n_content, n_publisher, n_origin, insert_time, alter_time) VALUES ('".$heading."', '".$content."', '01', '".$origin."', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
            if (!$query) {
                $errmsg = "增加记录错误：".mysql_error();
                echo json_encode(array(array("errmsg" => $errmsg)));
                die($errmsg);
                return false;
            }
            else {
                $id = mysql_insert_id();
                $querySub = mysql_query("INSERT INTO news_catsub (n_id, nc_id, dnc_id, insert_time, alter_time) VALUES (".$id.", 1, ".$category.", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
                if (!$querySub) {
                    $errmsg = "增加记录错误：".mysql_error();
                    echo json_encode(array(array("errmsg" => $errmsg)));
                    die($errmsg);
                    return false;
                } else {
                    $errmsg = "增加记录成功！";
                    echo json_encode(array(array("errmsg" => $errmsg)));
                    return true;
                };
            };
        } else {
            return false;
        };
    };

    //更新数据库中的新闻记录，分别更新主表news_main及子表news_catsub。
    function updateNews($id, $heading, $content, $origin, $category) {
        $errmsg = "";
        
        if (connectToDb()) {
            header("Content-type:application/json;charset=utf-8");
            $query = mysql_query("UPDATE news_main SET n_heading='".$heading."', n_content='".$content."', n_origin='".$origin."', alter_time = CURRENT_TIMESTAMP WHERE n_id = ".$id."");
            if (!$query) {
                $errmsg = "修改记录错误：".mysql_error();
                echo json_encode(array(array("errmsg" => $errmsg)));
                die($errmsg);
                return false;
            }
            else {
                $querySub = mysql_query("UPDATE news_catsub SET dnc_id=".$category.",alter_time=CURRENT_TIMESTAMP WHERE n_id = ".$id."");
                if (!$querySub) {
                    $errmsg = "修改记录错误：".mysql_error();
                    echo json_encode(array(array("errmsg" => $errmsg)));
                    die($errmsg);
                    return false;
                } else {
                    $errmsg = "修改记录成功！";
                    echo json_encode(array(array("errmsg" => $errmsg)));
                    return true;
                };
            };
        } else {
            return false;
        };
    };

    //删除数据库中的新闻记录，分别将主表news_main及子表news_catsub中的对应记录有效标志改为0。
    function deleteNews($id) {
        $errmsg = "";
        
        if (connectToDb()) {
            header("Content-type:application/json;charset=utf-8");
            $query = mysql_query("UPDATE news_main SET n_status = '0', alter_time = CURRENT_TIMESTAMP WHERE n_id = ".$id."");
            if (!$query) {
                $errmsg = "删除记录错误：".mysql_error();
                echo json_encode(array(array("errmsg" => $errmsg)));
                die($errmsg);
                return false;
            }
            else {
                $querySub = mysql_query("UPDATE news_catsub SET nc_status = '0', alter_time = CURRENT_TIMESTAMP WHERE n_id=".$id."");
                if (!$querySub) {
                    $errmsg = "删除记录错误：".mysql_error();
                    echo json_encode(array(array("errmsg" => $errmsg)));
                    die($errmsg);
                    return false;
                } else {
                    $errmsg = "删除记录成功！";
                    echo json_encode(array(array("errmsg" => $errmsg)));
                    return true;
                };
            };
        } else {
            return false;
        };
    };
?>