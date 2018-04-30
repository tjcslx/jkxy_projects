<?php
    require_once("connect.php");

    $heading = $_GET["heading"];
    $abstract = $_GET["abstract"];
    $origin = $_GET["origin"];
    $category = $_GET["category"];
    $start = $_GET["start"];
    $num = $_GET["num"];
    
    getNews($heading, $abstract, $origin, $category, $start, $num);
?>