<?php
include('db.php');

$db = $_POST['db'];
$v = $_POST['v']; /*v stands for value*/

mysql_query("UPDATE `video` SET `watched` = $v WHERE `id` = $db");
echo mysql_error();
echo $v;
?>