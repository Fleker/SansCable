<?php
include('init.php');

$error = array(
	'code' => 200,
	'res' => 'OK'
);
$uid = $_SESSION['uid'];

$db = validate($_POST['data']);
if($db == 'new' || $db == 0 || $db == 'all' || $db == 'qx' || $db == 'fifty') {
	if($db == 'new') {
		$query = mysql_query("SELECT * FROM `video` WHERE `watched` = 0 AND `uid` = $uid ORDER BY `add` DESC");
		echo mysql_error();
	}
	else if($db == 'fav') {
    	$query = mysql_query("SELECT * FROM `video` WHERE `favorite` = 1 AND `uid` = $uid ORDER BY `add` DESC");
		echo mysql_error();
 	}
	else if($db == 'all') {
		$query = mysql_query("SELECT * FROM `video` WHERE `uid` = $uid ORDER BY `add` DESC");
		echo mysql_error();
	}
        else if($db == 'fifty') {
                $query = mysql_query("SELECT * FROM `video` WHERE `watched` = 0 AND `uid` = $uid ORDER BY `add` DESC LIMIT 50");
                echo mysql_error(); 
        }
        else if($db == 'flicks') {
                $query = mysql_query("SELECT * FROM `video` WHERE `watched` = 0 AND `uid` = $uid ORDER BY `duration` DESC LIMIT 12");
                echo mysql_error(); 
        }
	else /*$db == q*/ {
     	$query = mysql_query("SELECT * FROM `video` WHERE `watched` = 0 AND `seen` > 0 AND `uid` = $uid ORDER BY `add` DESC");
 	}
	if(mysql_error()) {
     	$error = array(
			'code' => 404,
			'res' => mysql_error()
		);
	}
	$data = array();
	while($row = mysql_fetch_assoc($query)) {
     	array_push($data, array(
     		'id' => $row['vid'],
     		'title' => $row['title'],
     		'db' => intval($row['id']),
     		'user' => array(
				'id' => $row['userid'],
				'name' => $row['user']
			 ),
     		'duration' => array(
     		 	'seconds' => intval($row['duration']),
     		 	'friendly' => secondsConversion($row['duration'])
     		),
     		'description' => $row['description'],
     		'src' => $row['src'],
     		'views' => intval($row['views']),
     		'img' => $row['img'],
     		'seen' => intval($row['seen']),
     		'watched' => intval($row['watched']),
     		'favorite' => intval($row['favorite']),
     		'time' => time2str($row['add']),
     		'tile' => intval($row['tile'])
     	));
	}
}
if ($db == 'q') {
        include('play_queue.php');
}
$data['error'] = $error;
//echo ();
echo json_encode($data);
//print_r($data);
?>