<?php
include('init.php');

$error = array(
	'code' => 200,
	'res' => 'OK'
);
//Get video object
$vid = validate($_GET['id']);
$source = validate($_GET['s']);
if(!isset($_GET['s']))
	$source = 'yt';

function upload_date($date, $source = 'yt') {
	if($source == 'vm' || $source == 'yt') {
		return strtotime($date);
	}
}
/*function tileScore($video) {
 	return 50;
}*/
if(!videoExists($vid, $source)) {
	$data = error404();
}
else {
	if($source == 'yt') {
		if(!isset($_GET['id']))
			$vid = 'STJ-O9cTXlI';

		else {
			$video = $yt->getVideoEntry($vid);
			/*$v = $yt->getRelatedVideoFeed($vid);
				$r = $v[0]->getVideoId();*/
			$str = print_r($video->author[0], true);
			//echo $str.'<br><br><br>';
			$strj = substr($str, strpos($str, 'http://gdata.youtube.com/feeds/api/users/') + 41);
			$stri = substr($strj, 0, strpos($strj, '[_namespaces:protected]') - 13);
			$data = array(
				'id' => $vid,
				'title' => $video->getVideoTitle(),
				'user' => array(
					'id' => $stri,
					'name' => $video->author[0]->name->text
				),
				'category' => $video->getVideoCategory(),
				'description' => validate_spacing(validate($video->getVideoDescription())),
				'duration' => array(
					'seconds' => intval($video->getVideoDuration()),
		            'friendly' => secondsConversion($video->getVideoDuration())
				),
				/*'src' => 'YouTube',*/
				'src' => 'yt',
				'views' => intval($video->getVideoViewCount()),
				'tile' => tileScore($vid),
				'img' => 'http://i.ytimg.com/vi/'.$vid.'/hqdefault.jpg',
				'url' => 'https://youtube.com/watch?v='.$vid,
				'upload' => strtotime($video->published->text),
				/*'related' => array (
				 	'episode' => null,
				 	'dvr' => null,
				 	'user' => null,
				 	'related' => $r
				),*/
				'embed' => null,
				'error' => $error
			);
		}
	}
	else if($source == 'vm') {
		if(!isset($_GET['id']))
			$vid = '12112529';
		else {
			$video = file_get_contents('http://vimeo.com/api/v2/video/'.$vid.'.json');
			$video = json_decode($video);
			$data = array(
				'id' => $video[0]->id,
			 	'title' => $video[0]->title,
			 	'user' => array(
			 	 	'id' => $video[0]->user_id,
			 	 	'name' => $video[0]->user_name
			 	),
			 	'category' => 'Entertainment',
			 	'description' => validate_spacing($video[0]->description),
			 	'duration' => array(
			 	 	'seconds' => $video[0]->duration,
			 	 	'friendly' => secondsConversion($video[0]->duration)
			 	),
			 	/*'src' => 'Vimeo',*/
			 	'src' => 'vm',
			 	'views' => $video[0]->stats_number_of_plays,
			 	/*'tile' => tileScore($vid),*/
			 	'img' => $video[0]->thumbnail_large,
			 	'url' => 'http://vimeo.com/'.$vid,
			 	'upload' => strtotime($video[0]->upload_date),
			 	/*'related' => array (
				 	'episode' => null,
				 	'dvr' => null,
				 	'user' => null,
				 	'related' => null
				),*/
				'embed' => $video[0]->embed_privacy,
			 	'error' => $error
			);
		}
	}
	else {
		$data = error404();
	}
}
if($data['description'] == null)
	$data['description'] = 'This video does not have a description.';

echo json_encode($data);
?>