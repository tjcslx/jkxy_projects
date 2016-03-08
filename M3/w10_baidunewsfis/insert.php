<?php
    require_once("connect.php");
    
    $heading = $_POST["heading"];
    $content = $_POST["content"];
    $origin = $_POST["origin"];
    $category = $_POST["category"];

    insertNews($heading, $content, $origin, $category);
?>