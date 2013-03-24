<?php
	//echo ' START QUEUE ';
        $duration = 0;
	$query = mysql_query("SELECT * FROM `video` WHERE `seen` > 0 AND `uid` = $uid AND `watched` = 0 ORDER BY `add` DESC");
 	while($row = mysql_fetch_assoc($query)) {
		$duration = $duration + intval($row['duration']) - intval($row['seen']);
     	//echo ' TO CONTINUE: '.$duration.'// '.$row['title'].'// '.$seen;
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
	 		$query = mysql_query("SELECT * FROM `video` WHERE `uid` = $uid AND `watched` = 0 ORDER BY `views` LIMIT 3");
	        while($row = mysql_fetch_assoc($query)) {
				$duration = $duration + intval($row['duration']) - intval($row['seen']);
                        //echo " TOP IN LIST - $duration ";
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
            $query = mysql_query("SELECT * FROM `video` WHERE `uid` = $uid AND `watched` = 0 ORDER BY `seen` LIMIT 5");
	        while($row = mysql_fetch_assoc($query)) {
				$duration = $duration + intval($row['duration']) - intval($row['seen']);
                        //echo " QUICK PLAYS - $duration ";
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
         //get random top daily
         //echo " MOST VIEWED TODAY ";
         $daily = file_get_contents('http://felkerdigitalmedia.com/sanscablebeta/data/videoFeed.php?f=most_viewed&s=yt&t=today');
         $d = /*json_decode(*/$daily/*);*/;
         $n = rand(0,24);
         $d = $d[n];
         array_push($data, $d);
         
?>