function infoUser(video, channelid, src) {
	if(video != undefined)
		channel = video.user.id;
	if(channelid != undefined)
		channel = channelid;
	if(src == undefined)
		src = 'yt';
 	if(true) {
		var stateObj = { scroll: false, 'set': 'loadInfoUser()', 'element': '#user' };
		history.pushState(stateObj, /*data[tileId].title+*/" | Sans Cable", "?user="+channel+"&s="+video.src); /* &s=...*/
	}
	else {
		window.location = '#user';
	}
	if(window.mobile)
		window.scrollTo(0,0);
	fadeOutEverything();
	loadInfoUser(channel);
}

function loadInfoUser(channelid) {
	if(channelid)
		channel = channelid;
	else
		channel = video.user.id;
	console.log(channel);
	//make HTTP request
	//s?=...
	//if(window.device.mobile == false)
		$('#user').fadeIn(500);
	$('.userData').html('<img src="../design/loading.gif">');
	$('.userDes').html('<img src="../design/loading.gif">');
	$('.userPan').html('<img src="../design/loading.gif">');
	scrollDisable();
	if(video == undefined)
		src = 'yt';
	else
		src = video.src
	$.get('../data/user.php', {id: channel, s: src, uid: user.id}, function(response) {
		channel = jQuery.parseJSON(response);
		//console.log(u);
		$('.userDes').html('');
		$('.userPan').html('');
		for(i=0;i<5;i++) {
			if(window.device.mobile == true) {
				if(channel.panorama[i])
					$('.userPan').append('<img style="width:250px" src="'+channel.panorama[i]+'">');
			}
			else {
				if(channel.panorama[i])
                	$('.userPan').append('<img style="width:300px" src="'+channel.panorama[i]+'">');
   			}
		}
		if(window.device.mobile)
			$('.userData').html('<img style="width:88px" src="'+channel.img+'">');
		else
            $('.userData').html('<img src="'+channel.img+'">');
		$('.userData').append('&nbsp;<font class="biggerFont">'+channel.name+'</font><br><font class="bigFont">'+channel.subscribers.total+' subscribers<br>'+channel.uploaded+' video(s) uploaded<br>Created on '+channel.created2+'</font>');
		if(channel.connections.facebook)
			$('.userData').append('<a href=""><img src="../design/social/facebook.png"></a>');
		$('.userDes').html(channel.description);
		if(channel.description2)
			$('.userDes').append('<hr>'+channel.description2);
		
		$('.userNav').addClass('action_bar');
		if(window.device.mobile) {
         	$('.userNav').html('<div style="left: 0px;" class="back action_button" onclick="pressBack()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/1_navigation_previous_item.png"></div>');
			$('.userNav').append('<div class="action_button" style="left: 20%;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/6_social_add_person.png"></div>');
			$('.userNav').append('<div class="action_button" style="left: 40%;" onclick="recentVid();"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/9_av_play_over_video.png"></div>');
			$('.userNav').append('<div class="action_button" style="left: 60%;" onclick="userPage()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/9_av_upload.png"></div>');
			$('.userNav').append('<div class="action_button" style="left: 80%;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/6_social_send_now.png"></div>');
		}
		else {
			if(true || window.device != 'googletv') {
				$('.userNav').html('<div style="left: 0px; top:0px" class="back action_button" onclick="pressBack()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/1_navigation_previous_item.png"></div>');
			}
			output = '<div class="action_button" style="top: 75px;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/6_social_add_person.png">';
			if(channel.subbed) {
				output = output + 'Unsubscribe';
			}
			else
				output = output + 'Subscribe';
			output = output + '</div>';
			
			output = output + '<div class="action_button" style="top: 175px;" onclick="recentVid()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_play_over_video.png">Recent Video</div>';
			output = output + '<div class="action_button" style="top: 275px;" onclick="userPage()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_upload.png">'+channel.src+' page</div>';
			output = output + '<div class="action_button" style="top: 375px;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/6_social_send_now.png">Suggest</div>';
			$('.userNav').append(output);
		}
	});

}
function recentVid() {
 	 $('#user').fadeOut(500);
	 loadVideo(channel.video, channel.src, 0);
}
function subToggle() {
 	$.post('../data/subscribe_toggle.php', {uid: user.id, src: channel.src, user: channel.id}, function(res) {
     	if(res == 1)
		 	loadInfoUser();
		else
			console.error(res);
  });
}
function userPage() {
 	if(channel.src == 'yt')
	 	openTab('http://youtube.com/user/'+channel.id);
	else if(channel.src == 'vm')
		openTab('http://vimeo.com/'+channel.id); 
}
function suggest() {
	return ':)';
}