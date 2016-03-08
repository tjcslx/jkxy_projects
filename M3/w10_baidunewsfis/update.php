<?php
    require_once("connect.php");

    $id = $_POST["id"];
    $heading = $_POST["heading"];
    $content = $_POST["content"];
    $origin = $_POST["origin"];
    $category = $_POST["category"];

    updateNews($id, $heading, $content, $origin, $category);
?>