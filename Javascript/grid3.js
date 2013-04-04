var TILE_IDS = [
    0 /*,4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25*/
];
var DemoClassRows = [ 'c-1_1', 'c-1_2' ];
var TemplateL =
[
        " A A B B",
        " B B A A",
        " A A B B",
        " B B A A"
];
var TemplateP = 
[
        " A A ",
        " B B ",
        " A A ",
        " B B "
];
var DemoTemplateRows = [
    [
        " A A B B C C ",
        " A A B B C C ",
        " . . . . . . ",
        " D D E E F F "
    ], [
        " . . . . . .",
        " . . . . . . ",
        " . . . . . . ",
        " . . . . . . "
    ] , [
        " A A A A A A",
        " B B B B B B",
        " A A A A A A",
        " B B B B B B"
    ], TemplateP,
    TemplateL,
    [
    	"A A B B C C D D",
    	"B B C C D D E E"
    ],
    [ 
    	"A A A A A",
    	"B B B B B",
    	"C C C C C"
    ]
];

/*var collection = [
{ "id":"STJ-O9cTXlI", "ad": 1, "watched":0, "favorite":1, "tileId":null, "src":"yt", "title":"Ryan Starr" , "user":"RyanStarVEVO" , "img":"http://i.ytimg.com/vi/STJ-O9cTXlI/hqdefault.jpg", "duration":"5:16", "seen":0, "time":"5 minutes ago", "description":"Music!", "views":4, "url":"https://www.youtube.com/watch?v=STJ-O9cTXlI"},
{ "id":"6tDRBb0apDg", "live": 1, "watched":0, "favorite":0, "tileId":null, "src":"yt", "title":"The Best Joke Ever!" , "user":"Nigahiga", "img":"http://i.ytimg.com/vi/6tDRBb0apDg/hqdefault.jpg", "duration":"2:34", "seen":0, "time":"7 hours ago", "description":"Funny puns await you in this continuing saga.", "views":0, "url":"https://www.youtube.com/watch?v=6tDRBb0apDg"},
{ "id":"T7MDMdfcRfI", "watched":1, "favorite":1, "tileId":null, "src":"yt", "title":"Old School vs. New School" , "user": "FreddieW", "img":"http://i.ytimg.com/vi/T7MDMdfcRfI/hqdefault.jpg", "duration":"3:27", "seen":0, "time":"Yesterday", "description":"N00bs fail, old school gaming is the best!", "views":2, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI" },
{ "id":"52302939", "watched":0, "favorite":1, "tileId":null, "src":"vm", "title":"Cityscape Chicago", "user":{"id":4263514,"name":"Eric Hines"}, "img":"http://b.vimeocdn.com/ts/360/989/360989391_640.jpg", "duration":{"seconds":209,"friendly":"03:29"}, "seen":0, "time":"1 Week Ago", "description":"Beautiful urban area", "views":105, "url":"http://vimeo.com/52302939"}
];*/
var collection = [
{ "id":"T7MDMdfcRfI", "watched":0, "favorite":0, "tileId":100, "src":"yt", "title":"Old School vs. New School" , "user": "FreddieW", "img":"http://i.ytimg.com/vi/T7MDMdfcRfI/hqdefault.jpg", "duration":"3:27", "seen":0, "time":"Yesterday", "description":"N00bs fail, old school gaming is the best!", "views":2, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI" },
];
var data = collection;
var video = null;

function tileAction(id) {
  	console.warn(data[id].type);
 	if(data[id].type == 'video' || data[id].type == undefined) {
		fadeOutEverything();
		infoVideo(id);
   	}
	else if(data[id].type == 'user') {
      	video = data[id];
		infoUser(data[id]);
	}
	else if(data[id].type == 'group')
		infoGroup(data[id].id, data[id].src);
	else if(data[id].type == 'category')
		category(data[id].id);
}
$(".dev-tile-number").hover(
  function () {
    $(this).addClass("hover");
  },
  function () {
    $(this).removeClass("hover");
  }
);
function vidExpand(tile) {
	$('#tileBg'+tile).addClass("dev-tile-bg-hovered");
}
function vidRetract(tile) {
	$('#tileBg'+tile).removeClass("dev-tile-bg-hovered");
}

function redraw() {
    //DemoTemplateRows
    TILE_IDS = new Array();
    var i;
  //if(!window.device.mobile) {
	for (i=0;i<(data.length);i++) {
		TILE_IDS.push(i);
	}
	
	for(tileId in TILE_IDS) {
			data[tileId].tileId = tileId;
		}
		out = '<table class="tileList"><tr>';
        	for(tileId in TILE_IDS) { /*List View*/
        		//looks best at >=1000 width
				//this.$el.find('#dev-tile-n'+tileId).html('<div class="dev-tile-block" style="background-image:url('+data[tileId].img+');background-size:contain;background-repeat:no-repeat;height:100%"></div><div class="dev-tile-bgl"><div class="dev-tile-numberl"><span class="dev-tile-data"><font style="font-size:17pt">' + data[tileId].title + '</font><br><font style="font-size:9pt">' + data[tileId].user + '<br>' + data[tileId].duration + ' - Added '+ data[tileId].time +'</font></span></div></div>');
				out = out + '<td class="t'+tileId+'" style="width: 200px;padding-left:50px;padding-right:50px" onclick="tileAction('+tileId+')"><!--<font size="16pt">'+data[tileId].title+'</font>-->';
				if(data[tileId].ad == 1) {
                  	out = out + '<div class="tileAd">ADVERT</div>';
   				}
   				else if(data[tileId].live == 1) {
                  	out = out + '<div class="tileLive">LIVE</div>';
                }
				else if(data[tileId].watched == 1 && !data[tileId].favorite == 1) {
                	out = out + '<div class="tileWatch">WATCHED</div>';
                }
				else if(data[tileId].favorite == 1 && !data[tileId].watched == 1) {
                	out = out + '<div class="tileFav">FAVORITE</div>';
                }
				else if(data[tileId].favorite == 1 && data[tileId].watched == 1) {
                	out = out + '<table style="width:100%;margin-top:-2px;';
					out = out + '"><tr><td style="font-size:16px;" class="tileWatch">WATCHED</td>';
					out = out + '<td style="font-size:16px;" class="tileFav">FAVORITE</td></table>';
				}
				else {
					//out = out + '<img src="'+data[tileId].img+'" style="width:100%"/>';
				}
				out = out + '<img src="'+data[tileId].img+'" style="width:200px"/><br><br>'+data[tileId].user.name+'<br>'+data[tileId].duration.friendly+'<br>Added '+data[tileId].time+'</td>';
				//out = out + '</td><td width="40%"><span class="dev-tile-data"><font class="bigFont">' + data[tileId].title + '</font><br><font style="font-size:9pt">' + data[tileId].user.name + '<br>' + data[tileId].duration.friendly + ' - Added '+ data[tileId].time +'</font></span></td><td width="40%"><div width="100%" style="height: '+193+'px;overflow-y:hidden" class="listblock">'+data[tileId].description+'</div></td></tr></table></div>';
				//this.$el.find('#dev-tile-n'+tileId).html(out);
			}
			$('.grid').html(out+'</tr></table>');
			highlight(tilehighlight);
}

function gridEmpty() {
	redraw();
	$('.grid').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No videos are in this collection. ");
	r = Math.round(Math.random() * 2);
	console.warn(r);
	if(r == 0)
		$('.grid').append("Well, um... this is kind of awkward.");
	else if(r == 1)
		$('.grid').append("Sorry 'bout that.");
	else if(r == 2)
		$('.grid').append("Try choosing a different collection.");
}
function gridClear() {
	$('.grid').html(' ');
	redraw();
}
function gridCount(n, q) {
  	if(q)
  		n = '?';
    $('#gridCount').html(' ('+n+')');
	setTimeout("highlight(0);moveCol(0)", 500);
}
function gridTitle(n) {
 	$('#gridTitle').html(n);
}
function gridRefresh() {
 	redraw();
}

tilehighlight = 0;
function highlight(id) {
	if(id < 0)
		id = 0;
	$('.t'+tilehighlight).css('background-color', 'inherit');
	$('.t'+id).css('background-color', '#00c');
	tilehighlight = id;
	document.getElementsByClassName('grid')[0].scrollLeft = 304*id;
	if(data[id] != undefined) {
		if(data[id].title != undefined)
			$('.tileTitle').html(data[id].title);
	}
	//scrollTo(200*id, 0);
}

/* * * SIDEBAR REDUX * * */
sidebarindex = -1;
sidebar = new Array('Play Queue', 'Discover', 'Subscriptions', 'Favorites', 'Settings');
/* * * Add UI and Arrow/Scroll UX for touch * * */
setTimeout("moveCol(1)", 2000);
function moveCol(delta) {
	var index2 = sidebarindex + delta;
	//update titles -- ui has touch boxes
	if(index2 >= 1)
		$('.colTop').html(sidebar[index2 - 1]);
	else
		$('.colTop').empty();
	if(index2 <= 3)
		$('.colBot').html(sidebar[index2 + 1]);
	else
		$('.colBot').empty();
	sidebarindex = index2;
	if(delta != 0) {
		console.log(delta);
		switch(sidebarindex)
		{
		case -1:
			//moveCol(1);
			sidebarindex = 0;
			break;
		case 0:
			refreshDB('q');
			console.log('q');
			break;
		case 1:
			discoverTop();
			break;
		case 2:
			loadSubs();
			break;
		case 3:
			refreshDB('fav');
			break;

		case 4:
			alert('Not working yet!')
			moveCol(-1);
			break;
		default:
			refreshDB('q');
			break;
		}
	}
	scrollTo(0,0);
	
}

window.device.cable3 = true;
window.onload = function() {
  document.onkeydown=function(e){
    if (!e) e=window.event;

	var k = e.keyCode;
	/*if(k !== 37 && k !==38 && k !== 39 && k !== 40 && k !==27 && k !==13)
		alert(k);*/
	console.log("Key "+k+" was pressed.");
	//alert(k);

	if(k == 37) {
		highlight(tilehighlight - 1);
	}
	if(k == 38) {
		moveCol(-1);
	}
	if(k == 39) {
		highlight(tilehighlight + 1);
	}
	if(k == 40) {
		moveCol(1);
	}
	if(k == 13) {
		//send act command
		//highlighted.dispatchEvent(ev);
		//$(highlighted).trigger('click');
		//ppVideo();
		$('.t'+tilehighlight).click();
	}
	if(k == 27) {
		window.history.back()
	}
	/*** Player Keys **/
	if(k == 179 || k == 32) {
		if(window.ytplayer){
			ppVideo();
		}
	}
	if(k == 178) {
		stopVideo();
	}
	if(k == 177) {
		returnVideo();
	}
	if(k == 176) {
     	seekVideo(30);
	}
	if(k == 227) {
		seekVideo(-10);
	}
	if(k == 228) {
		seekVideo(10);
	}
  }
}