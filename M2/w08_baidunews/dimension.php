<?php
    require_once("connect.php");

    $tableName = $_GET["tableName"];
    if ($tableName == "origin") {
        getOriginDimension("baidunews");
    } else {
        getCategoryDimension("baidunews");
    };
?>