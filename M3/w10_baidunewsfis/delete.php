<?php
    require_once("connect.php");

    $id = $_POST["id"];

    deleteNews($id);
?>