<!DOCTYPE html>
<html>
<head>  
	<?php
		include('../func/func.php');
		include('../func/db.php');
	?>
	<!--https://plus.google.com/112249225796277470583/posts/ZuRjS2cerox on GTV Autozoom-->
    <meta charset="utf-8">
    <title>Sans Cable - My DVR</title>
    
    <!--Analytics-->
    <script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-30650779-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>


    <link rel="shortcut icon"
 href="http://felkerdigitalmedia.com/sanscable2/pr/web/logo3.png" />
    
    
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/themes/ui-lightness/jquery-ui.css" type="text/css" media="all" />
    <link rel="stylesheet" href="tiledemo.css" />
    <link rel="stylesheet" href="app_basics.css" />
    <?php
    include('../func/agent.php');

	function generateHint() {
		//will randomly generate a neat hint
		$hints = Array('The URL will change whenever you watch a different video so you can share a video link with a friend!',
			'This list of hints is randomly generated so you will always learn new things!');
		return $hints[array_rand($hints)];
	}
	?>
	
	
	<?php /* this is Facebook metadata */
	if($_GET['watch'] || $_GET['video']) {
      	if($_GET['watch'])
      		$vid = validate($_GET['watch']);
      	else
            $vid = validate($_GET['video']);
		$s = validate($_GET['s']);
		if(!$s)
			$s = 'yt';
		//echo "SELECT * FROM `video` WHERE `vid` = '$vid' AND `src` = '$s' LIMIT 1 ORDER BY `add`";
		$data = mysql_query("SELECT * FROM `video` WHERE `vid` = '$vid' AND `src` = '$s' ORDER BY `add` LIMIT 1 "); /* ORDER BY `add`*/
		echo mysql_error();
		while($row = mysql_fetch_assoc($data)) {
          	$add = $row['add'];
    		echo '
    			  <meta property="fb:app_id" content="456653801039439" />
                  <meta property="og:type" content="video.other" />
                  <meta property="og:title" content="'.$row['title'].'" />
                  <meta property="og:image" content="'.$row['img'].'" />
                  <meta property="og:description" content="'.$row['description'].'" />
                  <meta property="og:url" content="http://felkerdigitalmedia.com/sanscablebeta/sandbox/custom_tiles2.php?video='.$vid.'&s='.$s.'">
                  <meta property="video:release_date" content="'.$add.'">
                  <!--<meta property="video:actor" content="http://felkerdigitalmedia.com/sanscablebeta/sandbox/custom_tiles2.php?user='.$row['user'].'&s='.$s.'">-->
                  <meta property="video:duration" content="'.$row['duration'].'">
    		';
		}
    }

    ?>

    <script type="text/javascript">
      // debounce utility from underscorejs.org
      var debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          if (immediate && !timeout) func.apply(context, args);
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      };
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>
    <script src="http://cloud.github.com/downloads/thinkpixellab/tilesjs/tiles.js"></script>
 	<script src="jcolor.js"></script>
    <!--<script src="tiledemo.js"></script>-->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    
    <script src="social.js"></script>
	<script src="grid.js"></script>
	<script src="tiles.js"></script>
	<script src="ux.js"></script>
	<script src="drag.js"></script>
	<script src="data.js"></script>

	<script src="search.js"></script>
	<script src="discover.js"></script>
	<script src="subscriptions.js"></script>
	<script src="settings.js"></script>

	<script src="video.js"></script>
	<script src="user.js"></script>
	<script src="group.js"></script>

    <!--YT AS3
    <script src="http://www.google.com/jsapi" type="text/javascript"></script>-->
    
    <!--VM-->
    <script src="http://a.vimeocdn.com/js/froogaloop2.min.js"></script>
    

<script>
 	//google.load("swfobject", "2.1");
</script>
</head>
<body>
<div id="fb-root"></div>
<script>
	//number of objects in the added div
	added = 0;
	logo = 'https://lh4.googleusercontent.com/-CLP604vp8mI/UCwcZAmvfnI/AAAAAAAAAK0/9OBcjxOpva0/s295/logo3.png';
	if(!window.device.mobile) {
		document.write('<div id="add" style="margin-top:25px" class="canvas" ondrop="drop(event)" ondragenter="enableDrop(event)" ondragleave="denyDrop(event)"	ondragover="allowDrop(event)"><font size="5">Drag & Drop to add content<br>or type a username/url<br><form id="canvas_form"><input type="text" class="canvas_input" id="canvas_input" oninput="textType(1)" onsubmit="alert(5)" placeholder="ie. yt:FreddieW" autofocus="autofocus"><input type="button" value="Subscribe" onclick="subscribeTo(1)"><span id="canvas_input_feed" style="display:none"></span></form></div>');
	}
	if(window.device.mobile == false/*g != 'phone'*/)
    	document.write('<img style="height:40px;position:absolute;margin-left:225px;top:5px" src="'+logo+'" id="logo"><div id="logoTitle" style="position:absolute;margin-left:261px;top:11px;height:40px">&nbsp;&nbsp;Sans Cable</div> <div id="time" style="position:fixed;left:90%;top:5px"></div>');
	else
      	document.write('<div id="logo" style="text-align:center;width:100%;margin-top:-25px;" onclick="menuPop();"><u>Menu</u>&nbsp;<img src="'+logo+'" style="height:50px;">&nbsp;&nbsp;Sans Cable<br></div>');
	$('#canvas_form').submit(function() {
      subscribeTo(1);
      return false;
    });
	</script>
	</font>
    <!--<button onclick="registerFacebook()">Log-in to Facebook</button>
    <button onclick="infoGroup('','yt')">Sample Playlist</button>
    <button onclick="infoGroup('','vm')">Sample VM Playlist</button>
	<button onclick="dataLiveFeed()">Live Shows</button>
	<button onclick="dataPopFeed()">Popular Videos</button>
	<button onclick="refreshDB('new')">New Videos</button>
	<button onclick="refreshDB('all')">All Videos</button>
    -->
	<div id="sample2-templates" class="dev-tiles-templates">
		Sort by:
        <ul>
            <li id="sample2-t1" class="dev-l1 dev-template"></li>
            <li id="sample2-t2" class="dev-l2 dev-template"></li>
            <li id="sample2-t3" class="dev-l3 dev-template"></li>
            <li id="sample2-t4" class="dev-l4 dev-template" style="display:none"></li>
            <li id="sample2-t5" class="dev-l5 dev-template" style="display:none"></li>
            <li id="sample2-t6" class="dev-l6 dev-template" style="display:none"></li>
            <!--<li id="sample2-t7" class="dev-l7 dev-template"></li>-->
        </ul>
    </div>
    <span id="gridTitle" style="font-weight:bold;">Please Wait</span>&nbsp;<span id="gridCount">(?)</span>
    <div id="sample2-grid" class="grid" onmouseover="pullMenu()"></div>
    <div id="video" class="fullScreen infoVideo">
		<div class="videoImg"></div>
		<div class="videoData font-outline"></div>
		<div class="videoDes font-outline"></div>
		<div class="videoNav"></div>
	</div>
	<div id="user" class="fullScreen infoUser">
		<div class="userPan"></div>
		<div class="userData font-outline"></div>
		<div class="userDes font-outline"></div>
		<div class="userNav"></div>
	</div>
	<div id="group" class="fullScreen infoGroup">
		<div class="groupPan"></div>
		<div class="groupData font-outline"></div>
		<div class="groupDes font-outline"></div>
		<div class="groupNav"></div>
	</div>
		<script>
			if(window.device.mobile == false) {

				document.write('<div id="play" class="fullScreen"><div id="player" style="width: 100%;position: fixed;"></div><div id="player_vm" class="fullScreen"></div>');
			}
			else
                document.write('<div id="player_yt" class="player"><div id="player"></div></div><div id="player_vm" class="player"></div><div id="play" class="fullScreen">');
		</script>
		<div style="z-index:5; display:none;">
        	<table style="position:fixed; height:70px; top:60%">
				<tr>
					<td class="videoControl" id="controlPause" onclick="ppVideo()">
						Pause
					</td>
					<td class="videoControl" onclick="stopVideo()">
						Stop
					</td>
				</tr>
        	</table>
		</div>
		<div id="playerTop" style="z-index:5; position: fixed;background-color: rgba(0, 0, 0, .6);height: 80%;width: 100%;top:0%;box-shadow: 0px 0px 14px black;">
         	<div style="left: 0px" class="back action_button" onclick="pressBack()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/1_navigation_previous_item.png"></div>
			<div style="position:fixed" class="playerSub font-outline"></div>
			<div style="position:fixed" class="playerTitle biggerFont font-outline"></div>
			<div class="playerControls">
				<span class="control_button" onclick="returnVideo()"> <img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_previous.png"> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<span class="control_button" onclick="seekVideo(-10)"> <img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_rewind.png"> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<span class="control_button" id="controlPause" onclick="ppVideo()"> <img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_play.png"> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<span class="control_button" onclick="stopVideo()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_stop.png"> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<span class="control_button" onclick="seekVideo(10)"> <img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_fast_forward.png"> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<span class="control_button" onclick="seekVideo(30)"> <img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_next.png"> </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

			</div>
			<div class="playerRelated">

			</div>
			<div class="playerList">

			</div>
		</div>
		<div id="playerControlsHover" class="fullScreen" style="opacity: 0.01;height:85%" onclick="ppVideo()">
		</div>
	</div>
	<div id="hints" class="fullScreen" style="color:white;text-align:center;width:100%">
		<font style="font-size:30px">Welcome to Sans Cable!</font><br>
		<font style="font-size:22px">The app will be ready in a moment...</font><br><br><br><br><br><br><br><br>
		<font style="font-size:22px"><b>Did you Know?...</b><br><?php echo generateHint(); ?></font>
	</div>
<script>

//if Facebook, add that, same for G+


</script>
	<script src="play.js"></script>

<style>
.menu {
    width: 40px;
    border-style:solid; border-color:black; border-width:2;
	position: fixed;
	left: -.1%;
	top: -.1%;
	height: 100.2%;
	z-index:1;
	overflow:scroll;
	background-color:#161616;
}
.menu-hint {
    opacity: 0;
    font-size:15pt;
}
.menu-item {
 	border-style:solid;
 	border-color:black;
 	border-width:2px;
 	width:100%;
 	height:100%;
 	background-color:#282828;
}


</style>

<div style="overflow-y:scroll" id="sidebar">
<table id="m" class="menu" style="overflow-y:auto;">
	<tr><td class="menu-height">
		<table class="menu-item" id="m-1_1"><tr>
		<td style="width:40px" >
			<img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/2_action_search.png">
		</td>
		<td class="menu-hint">
			<input type="search" id="sidebar_search" oninput="autoSearch();">
		</td></tr></table></td>
	</tr>
	<script>
	if(window.device.mobile) {
    	document.write('<tr><td class="menu-height"><table class="menu-item" id="m-0_1"><tr><td style="width:40px" ><b>+</b></td><td class="menu-hint"><input type="search" id="sidebar_add" oninput=""><button onclick="buttonSub()">Go!</button><br><div id="add"><span id="added_check0"></span></div></td></tr></table></td></tr>');
 	}
	</script>
	<tr><td class="menu-height">
		<table class="menu-item" id="m-2_1"><tr>
		<td style="width:40px" >
			<img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/9_av_play.png">
		</td>
		<td class="menu-hint">
			Play Queue
		</td></tr></table></td>
	</tr>
	<tr><td class="menu-height">
		<table class="menu-item" id="m-3_1"><tr>
		<td style="width:40px" >
			<span id="sidebar_videocount"><b>?</b></span>
		</td>
		<td class="menu-hint">
			<!--My Videos<br><font style="font-size:10px" id="sidebar_videocount"><b>(401 Unseen)</b></font>-->
			Unseen
		</td></tr></table></td>
	</tr>
	<tr><td class="menu-height">
		<table class="menu-item" id="m-4_1"><tr>
		<td style="width:40px" >
			<img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/3_rating_favorite.png">
		</td>
		<td class="menu-hint">
			Favorites
		</td></tr></table></td>
	</tr>
	<tr><td class="menu-height">
		<table class="menu-item" id="m-5_1"><tr>
		<td style="width:40px" >
			<img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/9_av_add_to_queue.png">
		</td>
		<td class="menu-hint">
			All Videos
		</td></tr></table></td>
	</tr>
	<tr><td class="menu-height">
		<table class="menu-item" id="m-6_1"><tr>
		<td style="width:40px" >
			<img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/7_location_web_site.png">
		</td>
		<td class="menu-hint">
			Discover
		</td></tr></table></td>
	</tr>
	<tr><td class="menu-height">
		<table class="menu-item" id="m-7_1"><tr>
		<td style="width:40px" >
			<img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/6_social_add_person.png">
		</td>
		<td class="menu-hint">
			Subscriptions
		</td></tr></table></td>
	</tr>
	<tr><td class="menu-height">
		<table class="menu-item" id="m-8_1"><tr>
		<td style="width:40px" >
			<img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/6_social_group.png">
		</td>
		<td class="menu-hint">
			Social
		</td></tr></table></td>
	</tr>
	<!--Social & Local will become Discover categories, mayhaps Live too if there is no room

	<tr><td class="menu-height">
		<table class="menu-item" id="m:11-1" onclick="this.dispatchEvent(ev);"><tr>
		<td style="width:40px" >
			O>
		</td>
		<td class="menu-hint">
			Local
		</td></tr></table></td>
	</tr>-->
	<tr><td class="menu-height">
		<table class="menu-item" id="m-9_1"><tr>
		<td style="width:40px" >
			<img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/2_action_settings.png">
		</td>
		<td class="menu-hint">
			Settings
		</td></tr></table></td>
	</tr>
	<tr><td class="menu-height">
		<table class="menu-item" id="m-10_1"><tr>
		<td style="width:40px" >
				<img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/2_action_about.png">
		</td>
		<td class="menu-hint">
			About

		</td></tr></table></td>
	</tr>

	<tr><td>
		<table><tr>
		<td style="width:40px" >
			<span id="signinButton">
			  <span
			    class="g-signin"
			    data-callback="signinCallback"
			    data-clientid="705332575177-h01s30knbu2uqcd4lqfpmcu6u3fcj8n0.apps.googleusercontent.com"
			    data-cookiepolicy="single_host_origin"
			    data-requestvisibleactions="http://schemas.google.com/AddActivity"
			    data-scope="https://www.googleapis.com/auth/plus.login">
			  </span>
			</span>
		</td>
		<td class="menu-hint">
			&nbsp;
		</td></tr></table></td>
	</tr>
</table>
</div>

<script>
menuAnimate = false;
menuPushed = false;

if(!window.device.mobile) {
 	animTime = 400;
	animTime2 = 400;
}
else {
 	animTime = 1;
	animTime2 = 1;
}

function pushMenu() {
	if(menuAnimate == false) {
		menuAnimate = true;
	  	//$(".menu").toggleClass("menu-change");
	  	/*$(".menu").animate({
		    width: "270px",
	  		}, animTime, 'linear', function() { menuAnimate = false; menuPushed = true;} );
		*/
		//$(".menu-hint").toggleClass("menu-hint-change");
	  	$(".menu-hint").animate({
		    opacity: 1,
		 	}, animTime2 );
	}
}
function pullMenu() {
  	if(menuAnimate == false) {
  		menuAnimate = true;
  	  	//$(".menu").toggleClass("menu-change");
	  	/*$(".menu").animate({
		    width: "40px",
	  		}, animTime, 'linear', function() { menuAnimate = false; menuPushed = false;} );
		*/
	  	//$(".menu-hint").toggleClass("menu-hint-change");
	  	$(".menu-hint").animate({
		    opacity: 0,
		 	}, animTime2 );
	}
}


if(window.device.mobile) {
    menuPopped = true;
    menuPop();
}
function menuPop() {
 	if(menuPopped) {
    	$(".menu").animate({
		    left: "-270px",
	  		}, 600, 'linear', function() { menuPopped = false;pullMenu();} );
	  	$("#logo").animate({
		    marginLeft: "0px",
	  		}, 600, 'linear', function() { } );
	  	/*$("body").animate({
		    left: "-270px",
	  		}, 600, 'linear', function() { menuPopped = false;pullMenu();} );*/
  	}
  	else {
     	$(".menu").animate({
		    left: "0px",
	  		}, 600, 'linear', function() { menuPopped = true;pushMenu();} );
	  	$("#logo").animate({
		    marginLeft: "270px",
	  		}, 600, 'linear', function() { } );
	  	/*$("body").animate({
		    left: "0px",
	  		}, 600, 'linear', function() { menuPopped = true;pushMenu();} );*/
   }
}

$('.menu').hover(
	function() {
		pushMenu();
	},
	function() {
		pullMenu();
});

jQuery('.menu-item').hover(function(){
	unanimateItem(highlighted);
  	animateItem(this);
  	/*jQuery(this).animate({
  		backgroundColor: jQuery.Color(200,200,200),
	      borderLeftColor: borderColor,
	      borderRightColor: borderColor,
	      borderTopColor: borderColor,
	      borderBottomColor: borderColor
  	}, 500 );*/

  	column = this.id.substr(this.id.indexOf("-") + 1, this.id.indexOf("_"));
  	switchMenu();

},
function() {
	unanimateItem(this);
});
getVideoB = false;
getUserB = false;
getGroupB = false;
<?php 
if(isset($_GET['user'])) {
	echo '
		getUserB = true;
		console.log("GETTING USER, LOADING?...");
		infoUser("", "'.$_GET['user'].'", "'.$_GET['s'].'")
	';
}
if($_GET['group']) {
	echo '
		getGroupB = true;
		console.log("GETTING PL, LOADING?..");
		infoGroup("'.$_GET['group'].'", "'.$_GET['src'].'")
	';
}
?>
</script>
<script src="../script/nav.js"></script>
<script src="../script/key.js"></script>
<script src="../script/actions.js"></script>
<script src="init.js"></script>
<script type="text/javascript">
      (function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();
    </script>


<?php
echo $_GET['user']."X-X".$_GET['group'];

if($_GET['watch'] || $_GET['video']) {
	//now load into video
    $u = $_SESSION['uid'];
    if(isset($u)) {
	    $data = mysql_query("SELECT * FROM `video` WHERE `vid` = '$vid' AND `src` = '$s' AND `uid` = $u ORDER BY `add` LIMIT 1 ");
	    if(mysql_num_rows($data)) {
	    	while($row = mysql_fetch_assoc($data)) {
				$v = array('time' => time2str($row['add']),
				'seen' => intval($row['seen']),
				'db' => intval($row['id']),
				'watched' => intval($row['watched']),
	     		'favorite' => intval($row['favorite']));
	
				//$v = json_encode($v);
			}
		}
	}
	$q = json_decode(file_get_contents("http://felkerdigitalmedia.com/sanscablebeta/data/video.php?id=$vid&s=$s"), true);
	//echo $q;
	if($v)
		$v = array_merge($v, $q);
	else
		$v = $q;


	echo '<script>
		getVideoB = true;

    	video = '.json_encode($v).';
    	data = new Array(video);
    	infoVideo(0);
    	console.log(video.title);
        gridTitle(\'Video from URL\');
    </script>
    ';
}
?>

</body>
</html>                                                                                                   '