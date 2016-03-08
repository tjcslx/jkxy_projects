<?php
    require_once("connect.php");
    
    $heading = $_GET["heading"];
    $content = $_GET["content"];
    $origin = $_GET["origin"];
    $category = $_GET["category"];

    insertNews("baidunews", $heading, $content, $origin, $category);
?>