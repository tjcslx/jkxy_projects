<?php
    require_once("connect.php");

    $id = $_GET["id"];
    $heading = $_GET["heading"];
    $content = $_GET["content"];
    $origin = $_GET["origin"];
    $category = $_GET["category"];

    updateNews("baidunews", $id, $heading, $content, $origin, $category);
?>