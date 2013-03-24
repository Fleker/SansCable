<?php
include('init.php');

$error = array(
	'code' => 200,
	'res' => 'OK'
);
//get feed
$f = validate($_GET['f']);
$s = validate($_GET['s']);
$t = validate($_GET['t']);

if(isset($t))
	$f .= '?time='.$t;
//echo 'https://gdata.youtube.com/feeds/api/standardfeeds/'.$f;

if(/*feedExists*/true) {
	if($s == 'yt' || !isset($s)) {
    	if(!isset($f)) {
        	$f = 'most_popular';
		}
		if($f == 'live_now') {
			$videoFeed = $yt->getVideoFeed('https://gdata.youtube.com/feeds/api/charts/live/events/live_now');
			foreach ($videoFeed as $video) {
				$data = array(
				'title' => $video->getVideoTitle(),
				'user' => array(
					'id' => $video->author[0]->name->text,
					'name' => $video->author[0]->name->text
				),
				'description' => validate_spacing(validate($video->getVideoDescription())));
			  }
		}
		else {
			$videoFeed = $yt->getVideoFeed('https://gdata.youtube.com/feeds/api/standardfeeds/'.$f);
				//echo 'https://gdata.youtube.com/feeds/api/standardfeeds/'.$f;
				//print_r($videoFeed);
            	$data = array();
            		foreach($videoFeed as $video) {
                    	array_push($data, array(
                    		'id' => $video->getVideoId(),
                    		'title' => $video->getVideoTitle(),
                    		'img' => 'http://i.ytimg.com/vi/'.$video->getVideoId().'/hqdefault.jpg',
                    		/*'user' => array('name' => $video->author[0]->name->text),*/
                    		'user' => array(
								'name' => undefined, 
								'id' => undefined
							), /* this will cause full data pull */
                    		'duration' => array(
								'seconds' => intval($video->getVideoDuration()),
					            'friendly' => secondsConversion($video->getVideoDuration())
							),
							'description' => validate_spacing(validate($video->getVideoDescription())),
							'url' => 'https://youtube.com/watch?v='.$video->getVideoId(),
							'views' => intval($video->getVideoViewCount()),
							'time' => time2str(strtotime($video->published->text)),
							'src' => 'yt',
							'tile' => tileScore($vid),
							'Addedtoyourcollection' => 0));
					}
					$data['error'] = $error;
		}

	}
	else if($s == 'vm') {
     	$data = array(
				'error' => array(
			 		'code' => 404,
					'res' => 'No data exists!'
			 		)
				);
	}
}
else {
	$data = array(
				'error' => array(
			 		'code' => 404,
					'res' => 'This feed does not exist!'
			 		)
				);
}
echo json_encode($data);