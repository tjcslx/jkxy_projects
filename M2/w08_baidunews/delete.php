<?php
    require_once("connect.php");

    $id = $_GET["id"];

    deleteNews("baidunews", $id);
?>