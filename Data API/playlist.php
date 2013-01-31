<?php
include('init.php');

$error = array(
	'code' => 200,
	'res' => 'OK'
);
//Get playlist object
$pl = validate($_GET['id']);
$source = validate($_GET['s']);
if(!isset($_GET['s']))
	$source = 'yt';
$meta = $_GET['meta'];
if(!isset($_GET['meta']))
	$meta = true;

if(!playlist_exists($pl, $source)) {
	$data = error404();
}
else {
	if($source == 'yt') {
		if(!isset($_GET['id']))
			$pl = '9A4F11645E5F95E1';
		$list = $yt->getPlaylistVideoFeed("https://gdata.youtube.com/feeds/api/playlists/$pl?v=2");
		if($list[0]) {
			$data = array(
				'id' => $pl,
				'name' => $list->title->text,
				'description' => validate_spacing($list->subtitle->text),
				'description2' => null,
				'created' => strtotime($list->updated->text) /*gets updated time, not created time */,
				'panorama' => array(0 => 'http://i.ytimg.com/vi/'.$list[0]->getVideoId().'/hqdefault.jpg'),
				'subscribers' => 0 /*input later, Sans Cable Only!!!*/,
				'videos' => count($list),
				'src' => $source,
				'error' => $error
			);
			if($meta == false) {
				$i = 0;
				foreach($list as $listvideo) {
					$data['video'][$i] = json_decode(file_get_contents('http://felkerdigitalmedia.com/sanscablebeta/data/video.php?id='.$listvideo->getVideoId()));
					$i++;
				}
			}
			if($list[1])
				array_push($data['panorama'], 'http://i.ytimg.com/vi/'.$list[1]->getVideoId().'/hqdefault.jpg');
			if($list[2])
				array_push($data['panorama'], 'http://i.ytimg.com/vi/'.$list[2]->getVideoId().'/hqdefault.jpg');
			if($list[3])
				array_push($data['panorama'], 'http://i.ytimg.com/vi/'.$list[3]->getVideoId().'/hqdefault.jpg');
			if($list[4])
				array_push($data['panorama'], 'http://i.ytimg.com/vi/'.$list[4]->getVideoId().'/hqdefault.jpg');
		}
		else {
			$data = array(
				'id' => $pl,
				'name' => $list->title->text,
				'description' => validate_spacing($list->subtitle->text),
			 	'error' => array(
			 		'code' => 400,
					'res' => 'This playlist has no videos!'
			 	)
			);
		}
	}
	else if($source == 'vm') {
		if(!isset($_GET['id']))
			$pl = 6376;
		$list = file_get_contents("http://vimeo.com/api/v2/channel/$pl/info.json");
		$list = json_decode($list);
		$r = json_decode(file_get_contents("http://vimeo.com/api/v2/channel/$pl/videos.json"));
		$data = array(
			'id' => $list->id,
			'name' => $list->name,
			'description' => validate_spacing($list->description),
			'description2' => null,
			'created' => strtotime($list->created_on),
			'panorama' => array(
				0 => $r[0]->thumbnail_large,
				1 => $list->logo
			),
			'videos' => count(json_decode(file_get_contents("http://vimeo.com/api/v2/channel/$pl/videos.json"))),
			'subscribers' => 0 /*input later, Sans Cable Only!!!*/,
			'src' => $source,
			'error' => $error
		);
		if($meta == false) {
			//return videos, not just info
			$vid = json_decode(file_get_contents("http://vimeo.com/api/v2/channel/$pl/videos.json"));
			if(count($vid) > 0) {
				$i = 0;
				foreach($vid as $video) {
					//echo $video->id;
	            	$data['video'][$i] = json_decode(file_get_contents('http://felkerdigitalmedia.com/sanscablebeta/data/video.php?id='.$video->id.'&s=vm'));
					$i++;
				}
			}
			else {
				$data = array(
				'id' => $pl,
				'name' => $play->name,
				'description' => validate_spacing($play->description),
			 	'error' => array(
			 		'code' => 400,
					'res' => 'This playlist has no videos!'
			 		)
				);
			}
		}
	}
	else
		$data = error404();
}

echo json_encode($data);
//echo "<script>console.log(".json_encode($data).");</script>";
?>