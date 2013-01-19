<?php
include('init.php');

$error = array(
	'code' => 200,
	'res' => 'OK'
);
//Get user object
$user = validate($_GET['id']);
$source = validate($_GET['s']);
if(!isset($_GET['s']))
	$source = 'yt';

if(!userExists($user, $source)) {
	$data = error404();
}
else {
	if($source == 'yt') {
    	if(!isset($_GET['id']))
    		$user = 'Nigahiga';
    	$pan = $yt->getUserUploads($user);
    	$pid = $yt->getPlaylistListFeed($user);
    	$playlists = array();
    	foreach($pid as $play) {
			//don't give info, just id
			//$playlists[] = json_decode(file_get_contents("http://felkerdigitalmedia.com/sanscablebeta/data/playlist.php?id=".substr($play->getPlaylistVideoFeedUrl(), strpos($play->getPlaylistVideoFeedUrl(), 'playlists/')+12)."&s=yt&meta=1"));
			$playlists[] = substr($play->getPlaylistVideoFeedUrl(), strpos($play->getPlaylistVideoFeedUrl(), 'playlists/')+12);
		}
		$name = $user;
    	$user = $yt->getUserProfile($user);
    	
    	$str = print_r($user->getUsername(), true);
            //echo $str.'<br>:'.strpos($str, '[_text:protected] =>').'<br><br><br><br><br>';
            $stri = substr($str, strpos($str, '[_text:protected] =>')+21, strpos($str, ' [_namespaces:protected]') - strpos($str, '[_text:protected] =>')-25);
    	$stat = $user->getStatistics();
    	$data = array(
    		'id' => $stri,
    		'name' => $user->title->text,
    		'created' => strtotime($user->getPublished()->text),
    		'created2' => date('M j, Y', strtotime($user->getPublished()->text)),
    		/*'url' => "http://youtube.com/$name",*/
    		'url' => $user->getUsername(),
    		'description' => validate_spacing($user->getAboutMe()),
    		'description2' => customDescription($user->getUsername(), 'yt'),
    		'img' => $user->getThumbnail()->getUrl(),
    		'src' => /*'YouTube',*/ 'yt',
    		'subscribers' => array(
    			'src' => $stat->getSubscriberCount(),
    			'cable' => subscribeCount($name, 'yt'),
    			'total' => intval($stat->getSubscriberCount())+ intval(subscribeCount($name, 'yt'))
    		),
    		'connections' => array(
    			'facebook' => userFacebook($name, 'yt'),
    			'google' => userGoogle($name, 'yt'),
    			'twitter' => userTwitter($name, 'yt'),
    			'url' => userURL($name, 'yt')
    		),
    		'video' => $pan[0]->getVideoId(),
    		'playlists' => $playlists,
    		'uploaded' => $user->getFeedLink(
    			'http://gdata.youtube.com/schemas/2007#user.uploads')->countHint,

    		'error' => $error
    	);
    	$i = 0;
    	$data['panorama'] = array();
    	foreach($pan as $v) {
        	if($i < 5) {
				array_push($data['panorama'], 'http://i.ytimg.com/vi/'.$v->getVideoId().'/hqdefault.jpg');
	        	$i++;       
        	}
		}
	}
	else if($source == 'vm') {
     	if(!isset($_GET['id']))
    		$user = '4799897';
    	$uid = $user;
    	$user = file_get_contents("http://vimeo.com/api/v2/$uid/info.json");
		$user = json_decode($user);
		$pan = file_get_contents("http://vimeo.com/api/v2/$uid/videos.json");
		$pan = json_decode($pan);
		$chan = file_get_contents("http://vimeo.com/api/v2/$uid/channels.json");
		$chan = json_decode($chan);
		$playlist = array();
		foreach($chan as $channel) {
			if($channel->is_creator == 'yes') {
				//return playlist object
				//$playlist[] = json_decode(file_get_contents("http://felkerdigitalmedia.com/sanscablebeta/data/playlist.php?id=$channel->id&s=vm&meta=1"));
				$playlist[] = $channel->id;
			}
		}
		$data = array(
			'id' => $user->id,
			'name' => $user->display_name,
			'created' => strtotime($user->created_on),
			'url' => 'http://vimeo.com/'.$user->id,
			'description' => validate_spacing($user->bio),
			'description2' => customDescription($user->id, 'vm'),
			'img' => $user->portrait_large,
			'src' => /*'Vimeo',*/ 'vm',
			'subscribers' => array(
            	'src' => 0,
            	'cable' => subscribeCount($user->id, 'vm'),
            	'total' => intval (0) + intval(subscribeCount($user->id, 'vm'))
			),
			'connections' => array(
				'facebook' => userFacebook($user->id, 'vm'),
				'google' => userGoogle($user->id, 'vm'),
				'twitter' => userTwitter($user->id, 'vm'),
				'url' => $user->url
			),
			'panorama' => array( /*get last five video thumbnails in array */
            	0 => $pan[0]->thumbnail_large,
            	1 => $pan[1]->thumbnail_large,
            	2 => $pan[2]->thumbnail_large,
            	3 => $pan[3]->thumbnail_large,
            	4 => $pan[4]->thumbnail_large,
			),
			'video' => $pan[0]->id,
			'playlists' => $playlist,
			'uploaded' => count(pan),

			'error' => $error
		);

	}
	else {
		$data = error404();
	}
}



echo json_encode($data);
?>