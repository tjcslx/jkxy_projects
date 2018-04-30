<?php
    require_once("config.php");
    require_once("removexss.php");
    
    //改写后的连接数据库函数
    function connectToDb() {
        $mysqli = new mysqli(MYSQL_ADDRESS, MYSQL_USERNAME, MYSQL_PASSWORD, DATABASE);
        if ($mysqli -> connect_errno) {
            echo "连接失败！".$mysqli -> connect_error;
            exit();
            return false;
        } else {
            if ($mysqli -> query("set names 'utf8'") === true) {
                return $mysqli;
            } else {
                exit();
                return false;
            }
        }
    };

    //原来的连接数据库函数，用于getNews函数。
    function connectToDbOld() {
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
        if (!connectToDb()) {
            return false;
        } else {
            header("Content-type:application/json;charset=utf-8");
        	$mysqli = connectToDb();
            $arr = array();
        	$query = "SELECT dno_id, dno_name FROM d_news_origin WHERE status = '1'";
        	if ($result = $mysqli -> query($query)) {
                while ($row = $result -> fetch_array()) {
                    array_push($arr, array("dno_id" => remove_xss($row["dno_id"]), "dno_name" => remove_xss($row["dno_name"])));
                }
                echo json_encode($arr);
                $result -> free();
            }
       		$mysqli -> close();
        };
    };

    //获取新闻版块代码表。
    function getCategoryDimension() {
        if (!connectToDb()) {
            return false;
        } else {
            header("Content-type:application/json;charset=utf-8");
        	$mysqli = connectToDb();
            $arr = array();
        	$query = "SELECT dnc_id, dnc_name FROM d_news_category WHERE status = '1'";
        	if ($result = $mysqli -> query($query)) {
                while ($row = $result -> fetch_array()) {
                    array_push($arr, array("dnc_id" => remove_xss($row["dnc_id"]), "dnc_name" => remove_xss($row["dnc_name"])));
                }
                echo json_encode($arr);
                $result -> free();
            }
       		$mysqli -> close();
        };
    };

    //获取新闻列表，因参数个数无法确定，未使用MySQLi扩展，存在SQL注入风险。
    function getNews($heading, $abstract, $origin, $category, $start, $num) {
        if (connectToDbOld()) {
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
                    array_push($arr, array("n_id" => remove_xss($row["n_id"]), "n_heading" => remove_xss($row["n_heading"]), "n_abstract" => remove_xss($row["n_abstract"]), "insert_time" => remove_xss($row["insert_time"]), "dno_name" => remove_xss($row["dno_name"])));
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
        if (!connectToDb()) {
            return false;
        } else {
            header("Content-type:application/json;charset=utf-8");
        	$mysqli = connectToDb();
            $arr = array();
        	$query = "SELECT n.n_id, n_heading, n_content, n.n_origin, do.dno_name, date_format(n.insert_time, \"%Y年%c月%e日\") as insert_date, date_format(n.insert_time, \"%Y年%c月%e日 %T\") as insert_time, dnc_id FROM news_catsub c, news_main n, d_news_origin do where n.n_id = c.n_id AND n.n_origin = do.dno_id AND (n.n_id = ?)";
            $stmt = $mysqli -> prepare($query);
            $stmt -> bind_param("i", $id);
            $stmt -> execute();
            $res = $stmt -> get_result();
            while ($row = $res -> fetch_array()) {
                array_push($arr, array("n_id" => remove_xss($row["n_id"]), "n_heading" => remove_xss($row["n_heading"]), "n_content" => remove_xss($row["n_content"]), "n_origin" => remove_xss($row["n_origin"]), "dno_name" => remove_xss($row["dno_name"]), "insert_date" => remove_xss($row["insert_date"]), "insert_time" => remove_xss($row["insert_time"]), "dnc_id" => remove_xss($row["dnc_id"])));
            }
            echo json_encode($arr);
            $res -> free();
       		$mysqli -> close();
        };
    };

    //向数据库中插入新闻记录，分别插入主表news_main及子表news_catsub，主表插入操作完成后，取出插入记录的ID并保存至id变量，然后插入子表。
    function insertNews($heading, $content, $origin, $category) {
        if (!connectToDb()) {
            return false;
        } else {
            header("Content-type:application/json;charset=utf-8");
        	$mysqli = connectToDb();
            $errmsg = "";
            $query = "INSERT INTO news_main (n_heading, n_content, n_publisher, n_origin, insert_time, alter_time) VALUES (?, ?, '01', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
            $stmt = $mysqli -> prepare($query);
            $stmt -> bind_param("ssi", $heading, $content, $origin);
            if (!$stmt -> execute()) {
                $errmsg = $stmt -> error;
                echo json_encode(array(array("errmsg" => $errmsg)));
                $stmt -> close();
            } else {
                $id = $mysqli -> insert_id;
                $query_sub = "INSERT INTO news_catsub (n_id, nc_id, dnc_id, insert_time, alter_time) VALUES (".$id.", 1, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
                $stmt = $mysqli -> prepare($query_sub);
                $stmt -> bind_param("i", $category);
                if (!$stmt -> execute()) {
                    $errmsg = $stmt -> error;
                } else {
                    $errmsg = "添加成功！";
                };
                echo json_encode(array(array("errmsg" => $errmsg)));
                $stmt -> close();
            };
            $mysqli -> close();
        };
    };

    //更新数据库中的新闻记录，分别更新主表news_main及子表news_catsub。
    function updateNews($id, $heading, $content, $origin, $category) {
        if (!connectToDb()) {
            return false;
        } else {
            header("Content-type:application/json;charset=utf-8");
        	$mysqli = connectToDb();
            $errmsg = "";
            $query = "UPDATE news_main SET n_heading = ?, n_content = ?, n_origin = ?, alter_time = CURRENT_TIMESTAMP WHERE (n_id = ?)";
            $stmt = $mysqli -> prepare($query);
            $stmt -> bind_param("ssii", $heading, $content, $origin, $id);
            if (!$stmt -> execute()) {
                $errmsg = $stmt -> error;
                echo json_encode(array(array("errmsg" => $errmsg)));
                $stmt -> close();
            } else {
                $query_sub = "UPDATE news_catsub SET dnc_id = ?, alter_time = CURRENT_TIMESTAMP WHERE (n_id = ?)";
                $stmt = $mysqli -> prepare($query_sub);
                $stmt -> bind_param("ii", $category, $id);
                if (!$stmt -> execute()) {
                    $errmsg = $stmt -> error;
                } else {
                    $errmsg = "更新成功！";
                };
                echo json_encode(array(array("errmsg" => $errmsg)));
                $stmt -> close();
            };
            $mysqli -> close();
        };
    };

    //删除数据库中的新闻记录，分别将主表news_main及子表news_catsub中的对应记录有效标志改为0。
    function deleteNews($id) {
        if (!connectToDb()) {
            return false;
        } else {
            header("Content-type:application/json;charset=utf-8");
        	$mysqli = connectToDb();
            $errmsg = "";
            $query = "UPDATE news_main SET n_status = '0', alter_time = CURRENT_TIMESTAMP WHERE (n_id = ?)";
            $stmt = $mysqli -> prepare($query);
            $stmt -> bind_param("i", $id);
            if (!$stmt -> execute()) {
                $errmsg = $stmt -> error;
                echo json_encode(array(array("errmsg" => $errmsg)));
                $stmt -> close();
            } else {
                $query_sub = "UPDATE news_catsub SET nc_status = '0', alter_time = CURRENT_TIMESTAMP WHERE (n_id = ?)";
                $stmt = $mysqli -> prepare($query_sub);
                $stmt -> bind_param("i", $id);
                if (!$stmt -> execute()) {
                    $errmsg = $stmt -> error;
                } else {
                    $errmsg = "删除成功！";
                };
                echo json_encode(array(array("errmsg" => $errmsg)));
                $stmt -> close();
            };
            $mysqli -> close();
        };
    };
?>