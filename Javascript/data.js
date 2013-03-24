function dataLiveFeed() {
	
}
function dataPopFeed() {
  	//gridTitle('Most Popular');
  	gridCount(0, true);
	$.post('../data/videoFeed.php?f=most_popular&s=yt', {}, function(response) {
		r = jQuery.parseJSON(response);
		console.log('popular videos received');
		//rearrange video data and tile data!
		data = new Array();
		gridClear();
		for(i=0;i<25;i++) {
			data.push({'id':r[i].id, 'src':r[i].src, 'tile':r[i].tile, 'seen':0, 'url':r[i].url, 'views':r[i].views, 'title':r[i].title, 'user':r[i].user.name, 'img':r[i].img, 'duration':r[i].duration.friendly, 'time':r[i].time, 'description':r[i].description, 'offline':false });
		}
        gridCount(data.length);
		redraw();
	});
}
function dataRecFeed() {
  	//gridTitle('Most Popular');
  	gridCount(0, true);
	$.post('../data/videoFeed.php?f=recently_featured&s=yt', {}, function(response) {
		r = jQuery.parseJSON(response);
		console.log('viral videos received');
		//rearrange video data and tile data!
		data = new Array();
		gridClear();
		for(i=0;i<25;i++) {
			data.push({'id':r[i].id, 'src':r[i].src, 'tile':r[i].tile, 'seen':0, 'url':r[i].url, 'views':r[i].views, 'title':r[i].title, 'user':r[i].user.name, 'img':r[i].img, 'duration':r[i].duration.friendly, 'time':r[i].time, 'description':r[i].description, 'offline':false });
		}
        gridCount(data.length);
		redraw();
	});
}
function dataDayFeed() {
  	//gridTitle('Most Popular');
  	gridCount(0, true);
	$.post('../data/videoFeed.php?f=most_viewed&s=yt&t=today', {}, function(response) {
		r = jQuery.parseJSON(response);
		console.log('viral videos received');
		//rearrange video data and tile data!
		data = new Array();
		gridClear();
		for(i=0;i<25;i++) {
			data.push({'id':r[i].id, 'src':r[i].src, 'tile':r[i].tile, 'seen':0, 'url':r[i].url, 'views':r[i].views, 'title':r[i].title, 'user':r[i].user.name, 'img':r[i].img, 'duration':r[i].duration.friendly, 'time':r[i].time, 'description':r[i].description, 'offline':false });
			getServerVideo(i, r[i].id, 'yt', false);
		}
        gridCount(data.length);
		redraw();
	});
}


//Now pull data from the server in two-step getter  
unwatched = {'length': 0, 'updated': new Date().getTime() / 1000};
function refreshDB(d) {
  		if(d == 'new')
  			$('#gridTitle').html('Unwatched');
  		else if(d == 'q')
  			$('#gridTitle').html('Play Queue');
		else if(d == 'fav')
			$('#gridTitle').html('Favorites');
		else if(d == 'all')
			$('#gridTitle').html('Your Videos');
		gridCount(0, true);
		$.post('../data/dbGetVideo.php', {data: d}, function(r) {
			console.log(r.length);
			data = new Array();
			if(r.length == 33)
				gridEmpty();
			else
				gridClear();
			r = jQuery.parseJSON(r);
			console.log(r.length);
			for(i in r) {
				if(i != 'error' && r[i] != undefined && r[i] != '{') {
					//console.log(r[i]);
					data[i] = r[i];
					var id = r[i].id;
					var s = r[i].src;
					
                                        if(data[i].description != undefined) {
                                            data[i].description = data[i].description.replace('&lt;br&gt;','<br>', 'g');
                                            data[i].description = data[i].description.replace('&amp;#039;', "'", 'g');
                                            data[i].description = data[i].description.replace('&#039;',"'", 'gi');
                                            data[i].description = data[i].description.replace('&quot;','"', 'g');
                                        }
					//if(window.device.mobile != true && i < 25)
					if((data[i].user.name == undefined || data[i].img == undefined || /*data[i].user.name == data[i].user.id*/ data[i].user.id.indexOf(' ')> -1 || data[i].user.id == undefined || !data[i].user.id.length) && i < 50) {
						console.warn('The following video requires server getting:');
						console.warn({'name': data[i].user.name, 'img': data[i].img, 'user':data[i].user.id});
						getServerVideo(i, id, s);
					}
				}
			}
			gridCount(data.length);
			if(d == 'new') {
				$('#sidebar_videocount').html(data.length);
				unwatched = {'length': data.length, 'updated': new Date().getTime() / 1000};
			}
			redraw();
			//data.splice(-1,0);
			/*for(i in r) {
				var id = r[i].id;
				var s = r[i].src;
				getServerVideo(i, id, s);
			}*/
		});
}
function unwatchedCount() {
  	t = unwatched.updated;
 	$.post('../data/dbUnwatched.php', {t: t}, function(r) {
      	res = jQuery.parseJSON(r);
		unwatched.length = res.length;
		unwatched.updated = res.updated;
		if(unwatched.length) {
        	$('#sidebar_videocount').html(unwatched.length + '*');
  		}
	});
}

function getServerVideo(i, id, src, server) {
	$.get('../data/video.php', {id: id, s: src}, function(res) {
		console.log(res);
        //window.res = jQuery.parseJSON(res);
        res = jQuery.parseJSON(res);
        if(res.error.code == 200) {
			console.log(i+res.title);
			//mark the database entry as Needing More Information to prevent too many calls
			if(data[i] == undefined || data[i].img == undefined || data[i].duration.seconds == 0 || data[i].user.name == '' || data[i].user.id == '')
				var update = true;
            data[i].title = res.title;
            data[i].user.id = res.user.id;
            data[i].user.name = res.user.name;
            data[i].category = res.category;
            data[i].description = res.description;
            data[i].duration.seconds = res.duration.seconds;
            data[i].duration.friendly = res.duration.friendly;
            data[i].views = res.views;
            data[i].img = res.img;
            data[i].embed = res.embed;
            data[i].type = 'video';
            
            //redo
            var time = data[i].time
            var seen = data[i].seen
            var favorite = data[i].favorite
            var watched = data[i].watched
            data[i] = res;
            data[i].time = time;
            data[i].seen = seen;
            data[i].favorite = favorite;
            data[i].watched = watched;
            
            data[i].description = data[i].description.replace('&lt;br&gt;','<br>', 'g');
                data[i].description = data[i].description.replace('&amp;#039;', "'", 'g');
                data[i].description = data[i].description.replace('&#039;',"'", 'gi');
                data[i].description = data[i].description.replace('&quot;','"', 'g');


            dataSave = data;
            if(update && server != false)
            	updateDB(data[i]);


            //here I'm going to update this stuff in the database

			if(Math.floor(i/5) == i/5 || i == data.length || i == data.length - 1) {
              	grid.isDirty = true;
				grid.resize();
                grid.redraw(true);	
   			}
			//redraw();
			//don't reset the whole grid, just refrsh it
        }
	});
}
function updateDB(data) {
	$.post('../func/db_update.php', {t:data.title, d:data.description,v:data.views, i:data.img, dr:data.duration.seconds, vid:data.id, src:data.src, user:data.user.name, userid:data.user.id}, function(data) {
     	if(data)
		 	console.error(data);
    });
}

function postTime(db, time) {
	$.post('../func/updateTime.php', {db: db, time:time}, function(response) {
    	for(i in data) {
			if(data[i] != undefined && data[i]) {
	        	if(data[i].db == db) {
	            	data[i].seen = parseInt(response);
	            	console.log('Current time of '+data[i].title+' is '+parseInt(response))
			 	}
		 	}
		}
	});
}
function postWatch(db, v) {
	$.post('../func/videoWatch.php', {db: db, v:v}, function(response) {
    	for(i in data) {
			if(data[i] != undefined && data[i]) {
	        	if(data[i].db == db) {
	            	data[i].watched = parseInt(response);
	            	console.log(data[i].title+' watched is '+response);
	            	redraw();
	            	//loadInfoVideo(i);
			 	}
		 	}
		}
	});
}
function postWatchToggle(db) {
	index = -1;
	for(i in data) {
			if(data[i] != undefined && data[i]) {
	        	if(data[i].db == db) {
	            	index = i;
			 	}
		 	}
		}

	if(data[index].watched == 1)
		v = 0;
	else
		v = 1;

	$.post('../func/videoWatch.php', {db: db, v:v}, function(response) {
    	for(i in data) {
			if(data[i] != undefined && data[i]) {
	        	if(data[i].db == db) {
	            	data[i].watched = parseInt(response);
	            	console.log(data[i].title+' watched is '+response);
	            	redraw();
	            	loadInfoVideo(i);
			 	}
		 	}
		}
	});
}
function postFavorite(db, v) {
	$.post('../func/videoFavorite.php', {db: db, v:v}, function(response) {
    	for(i in data) {
			if(data[i] != undefined && data[i]) {
	        	if(data[i].db == db) {
	            	data[i].favorite = response;
	            	console.log(data[i].title+' favorite is '+response);
	            	redraw();
	            	loadInfoVideo(i);
	            	/*
	            	if(response)
	            		//$('#videoFavoriteIcon').attr('src', 'favorite_selected');
	            	else
	            		//same*/
			 	}
		 	}
		}
	});
} 
function getDbById(id, src, uid) {
	
}          
function requestDB(id, src) {
 	//we know uid
	uid = 1
	$.post('../data/dbGetId.php', {id:id, src:src, uid:uid}, function(r) {
    	video.db = r;
	});
}