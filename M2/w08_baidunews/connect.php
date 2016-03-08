<?php
    require("config.php");
    
    //连接数据库函数
	function connectToDb($dbName) {
		$connect = mysql_connect(MYSQL_ADDRESS, MYSQL_USERNAME, MYSQL_PASSWORD);
    	if ($connect) {
    		mysql_query("set names 'utf8'");
    		mysql_select_db($dbName, $connect);
        	return true;
    	} else {
    		return false;
    	}
	};

    //获取新闻来源代码表
    function getOriginDimension($dbName) {
        if (connectToDb($dbName)) {
            $query = mysql_query("SELECT dno_id, dno_name FROM d_news_origin WHERE status = '1'");
            $queryCount = mysql_num_rows($query);
            if ($queryCount == 0) {
                return false;
            } else {
                for ($i = 0; $i < $queryCount; $i++) {
                    $queryArr = mysql_fetch_assoc($query);
                    $dnoId = $queryArr["dno_id"];                    
                    $dnoName = $queryArr["dno_name"];
                    echo "<option value=\"".$dnoId."\">".$dnoName."</option>";
                }
            };
            return true;
        } else {
            return false;
        }
    };

    //获取新闻版块代码表
    function getCategoryDimension($dbName) {
        if (connectToDb($dbName)) {
            $query = mysql_query("SELECT dnc_id, dnc_name FROM d_news_category WHERE status = '1'");
            $queryCount = mysql_num_rows($query);
            if ($queryCount == 0) {
                return false;
            } else {
                for ($i = 0; $i < $queryCount; $i++) {
                    $queryArr = mysql_fetch_assoc($query);
                    $dncId = $queryArr["dnc_id"];                    
                    $dncName = $queryArr["dnc_name"];
                    echo "<option value=\"".$dncId."\">".$dncName."</option>";
                }
            }
            return true;
        } else {
            return false;
        }
    };

    //向数据库中插入新闻记录，分别插入主表news_main及子表news_catsub，主表插入操作完成后，取出插入记录的ID并保存至id变量，然后插入子表。
    function insertNews($dbName, $heading, $content, $origin, $category) {
        $errmsg = "";
        
        if (connectToDb($dbName)) {
            $query = mysql_query("INSERT INTO news_main (n_heading, n_content, n_publisher, n_origin, insert_time, alter_time) VALUES ('".$heading."', '".$content."', '01', '".$origin."', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
            if (!$query) {
                $errmsg = "增加记录错误：".mysql_error();
                echo "增加记录错误！";
                die($errmsg);
                return false;
            }
            else {
                $id = mysql_insert_id();
                $querySub = mysql_query("INSERT INTO news_catsub (n_id, nc_id, dnc_id, insert_time, alter_time) VALUES (".$id.", 1, ".$category.", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
                if (!$querySub) {
                    $errmsg = "增加记录错误：".mysql_error();
                    echo "增加记录错误！";
                    die($errmsg);
                    return false;
                } else {
                    echo "增加记录成功！";
                    return true;
                };
            };
        } else {
            return false;
        };
    };

    //更新数据库中的新闻记录，分别更新主表news_main及子表news_catsub。
    function updateNews($dbName, $id, $heading, $content, $origin, $category) {
        $errmsg = "";
        
        if (connectToDb($dbName)) {
            $query = mysql_query("UPDATE news_main SET n_heading='".$heading."', n_content='".$content."', n_origin='".$origin."', alter_time = CURRENT_TIMESTAMP WHERE n_id = ".$id."");
            if (!$query) {
                $errmsg = "修改记录错误：".mysql_error();
                echo "修改记录错误！";
                die($errmsg);
                return false;
            }
            else {
                $querySub = mysql_query("UPDATE news_catsub SET dnc_id=".$category.",alter_time=CURRENT_TIMESTAMP WHERE n_id = ".$id."");
                if (!$querySub) {
                    $errmsg = "修改记录错误：".mysql_error();
                    echo "修改记录错误！";
                    die($errmsg);
                    return false;
                } else {
                    echo "修改记录成功！";
                    return true;
                };
            };
        } else {
            return false;
        };
    };

    //删除数据库中的新闻记录，分别将主表news_main及子表news_catsub中的对应记录有效标志改为0。
    function deleteNews($dbName, $id) {
        $errmsg = "";
        
        if (connectToDb($dbName)) {
            $query = mysql_query("UPDATE news_main SET n_status='0', alter_time = CURRENT_TIMESTAMP WHERE n_id = ".$id."");
            if (!$query) {
                $errmsg = "删除记录错误：".mysql_error();
                echo "删除记录错误！";
                die($errmsg);
                return false;
            }
            else {
                $querySub = mysql_query("UPDATE news_catsub SET nc_status='0', alter_time = CURRENT_TIMESTAMP WHERE n_id=".$id."");
                if (!$querySub) {
                    $errmsg = "删除记录错误：".mysql_error();
                    echo "删除记录错误！";
                    die($errmsg);
                    return false;
                } else {
                    echo "删除成功！";
                    return true;
                };
            };
        } else {
            return false;
        };
    };
?>