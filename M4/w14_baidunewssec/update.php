<?php
    require_once("connect.php");

    $id = $_POST["id"];
    $heading = remove_xss($_POST["heading"]);
    $content = remove_xss($_POST["content"]);
    $origin = remove_xss($_POST["origin"]);
    $category = remove_xss($_POST["category"]);

    updateNews($id, $heading, $content, $origin, $category);
?>