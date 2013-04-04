function infoGroup(pid, src) {
	if(pid.length == 0 && src == 'yt')
		pid = '0187261431F1623D';
		//pid = '9A4F11645E5F95E1';
	else if(pid.length == 0 && src == 'vm')
		pid = '6376';
	if(src.length == 0)
		src = 'yt';
 	if(true) {
		var stateObj = { scroll: false, 'set': 'loadInfoGroup()', 'element': '#group' };
		history.pushState(stateObj, /*data[tileId].title+*/" | Sans Cable", "?group="+pid+"&s="+src); /* &s=...*/
	}
	else {
		window.location = '#group';
		window.scrollTo(0,0);
	}
	loadInfoGroup(pid, src);
}

function loadInfoGroup(pid, src) {
	//make HTTP request
	//s?=...
	if(window.device.mobile != true)
		$('#group').fadeIn(500);
	$('#sidebar').fadeOut(1);
	$('.groupData').html('<img src="../design/loading.gif">');
	$('.groupDes').html('<img src="../design/loading.gif">');
	$('.groupPan').html('<img src="../design/loading.gif">');
	scrollDisable();
	$.post("../data/playlist.php?meta=true&s="+src+"&id="+pid+"&uid="+user.id, {}, function(response) {
		group = jQuery.parseJSON(response);
		//console.log(u);
		$('.groupDes').html('');
		$('.groupPan').html('');
		for(i=1;i<5;i++) {
			if(window.device.mobile == true) {
				if(group.panorama[i])
					$('.groupPan').append('<img style="width:250px" src="'+group.panorama[i]+'">');
			}
			else {
				if(group.panorama[i])
                	$('.groupPan').append('<img style="width:300px" src="'+group.panorama[i]+'">');
   			}
		}
		if(window.device.mobile)
			$('.groupData').html('<img style="width:88px" src="'+group.panorama[0]+'">');
		else
            $('.groupData').html('<img style="width:350px" src="'+group.panorama[0]+'">');
		$('.groupData').append('&nbsp;<font class="biggerFont groupDataTitle" id="groupDataTitle">'+group.name+'</font><br><font class="bigFont groupDataInfo">'+group.subscribers+' subscribers<br>'+group.videos+' video(s) uploaded</font>');
		/*if(group.connections.facebook)
			$('.groupData').append('<a href=""><img src="../design/social/facebook.png"></a>');*/
		$('.groupDes').html(group.description);
		if(group.description2)
			$('.groupDes').append('<hr>'+group.description2);
		
		$('.groupNav').addClass('action_bar');
		if(window.device.mobile) {
			$('#groupDataTitle').removeClass('biggerFont');
         	$('.groupNav').html('<div style="left: 0px;" class="back action_button" onclick="pressBack()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/1_navigation_previous_item.png"></div>');
			$('.groupNav').append('<div class="action_button" style="left: 20%;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/6_social_add_person.png"></div>');
			$('.groupNav').append('<div class="action_button" style="left: 40%;" onclick="loadVideo(\''+group.videos+'\', \'yt\' /*switch*/, 0 /*switch*/)"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/9_av_play_over_video.png"></div>');
			$('.groupNav').append('<div class="action_button" style="left: 60%;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/9_av_upload.png"></div>');
			$('.groupNav').append('<div class="action_button" style="left: 80%;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/6_social_send_now.png"></div>');
		}
		else {
			if(true || window.device != 'googletv') {
				$('.groupNav').html('<div style="left: 0px; top:0px" class="back action_button" onclick="pressBack()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/mdpi/1_navigation_previous_item.png"></div>');
			}
			output = '<div class="action_button" style="top: 75px;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/6_social_add_person.png">';
			if(group.status == true ) {
				output = output + 'Unsubscribe';
			}
			else
				output = output + 'Subscribe';
			output = output + '</div>';
			
			output = output + '<div class="action_button" style="top: 175px;" onclick="loadVideo(\''+group.videos+'\', \'yt\' /*switch*/, 0 /*switch*/)"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_play_over_video.png">Recent Video</div>';
			output = output + '<div class="action_button" style="top: 275px;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/9_av_upload.png">'+group.src+' page</div>';
			output = output + '<div class="action_button" style="top: 375px;" onclick="subToggle()"><img src="../design/android-icons/Android_Design_Icons_20120711/All_Icons/holo_dark/hdpi/6_social_send_now.png">Suggest</div>';
			$('.groupNav').append(output);
		}
	});

}