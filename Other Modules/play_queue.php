<?php
	$duration = 0;
	$query = mysql_query("SELECT * FROM `video` WHERE `seen` > 0 AND `uid` = $uid ORDER BY `add` DESC");
 	while($row = mysql_fetch_assoc($query)) {
		$duration = $duration + intval($row['duration']) - intval($row['seen']);
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
	 if($duration < 10*60) {
	 		$query = mysql_query("SELECT * FROM `video` ORDER BY `views` DESC LIMIT 3");
	        while($row = mysql_fetch_assoc($query)) {
				$duration = $duration + intval($row['duration']) - intval($row['seen']);
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
	 if($duration < 15*60) {
            $query = mysql_query("SELECT * FROM `video` ORDER BY `seen` LIMIT 5");
	        while($row = mysql_fetch_assoc($query)) {
				$duration = $duration + intval($row['duration']) - intval($row['seen']);
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
?>