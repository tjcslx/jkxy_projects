<?php
    require_once("connect.php");
    
    $heading = remove_xss($_POST["heading"]);
    $content = remove_xss($_POST["content"]);
    $origin = remove_xss($_POST["origin"]);
    $category = remove_xss($_POST["category"]);

    insertNews($heading, $content, $origin, $category);
?>