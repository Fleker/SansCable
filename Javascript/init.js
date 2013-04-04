function initialTile() {
	//alert(window.innerHeight+' x '+window.innerWidth);
	if(window.device.mobile && window.innerHeight <= window.innerWidth) {
		$('#sample2-t4').trigger('click')
	}
	else if(window.device.mobile && window.innerHeight > window.innerWidth ) {
		$('#sample2-t5').trigger('click')
	}
	else if(window.device.g == 'tv') {
        $('#sample2-t3').trigger('click')
 	}
	else {
		$('#sample2-t1').trigger('click')
	}
}
window.device.as3 = false;

$(document).ready(function(){
    console.log('DOM Loaded (DOMContentLoaded)');
    initiate();
  });
function initiate() {
	fadeOutEverything('#sidebar');
	$('#sidebar').show();
	setTimeout("switchContent();$('#canvas_input').focus();", 1000);
	//switchContent();
	unwatchedCount();
	refreshDB('q');
	$('#canvas_input').focus();
	setTimeout("gridTitle('Play Queue');", 2000);
	initialTile();

	if(getVideoB)
		$('#video').fadeIn(500);
	if(getUserB)
		$('#user').fadeIn(500);
	if(getGroupB)
		setTimeout("$('#group').fadeIn(500);", 2000);
	//refreshDB('q');
}
//refreshDB('new');
setInterval('updateTime()', 5000);

displayTime();
setInterval("displayTime()", 5000);

setInterval('unwatchedCount()', 1000*60*3);
$('#canvas_input').focus();