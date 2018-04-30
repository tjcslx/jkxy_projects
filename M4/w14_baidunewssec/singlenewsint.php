<?php
    require_once("connect.php");
    $id = $_GET["id"];
    
    getSingleNews($id);
?>