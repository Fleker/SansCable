function discoverTop() {
  	//gridClear();
	data = [
        { "title":"Holiday", "id":"Holiday", "type":"category", "tileId":100,  "user": {"id": "", "name": "Celebrate the season!"}, "description":"Celebrate the season with these holiday videos!", "img":"../design/discover/christmas.png", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
    	{ "title":"Featured", "id":"Featured", "type":"category", "tileId":100,  "user": {"id": "", "name": "Best of the best"}, "description":"Hand-picked videos, the best of YouTube, is shown here", "img":"../design/discover/featured.png", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"}
	];
	gridTitle('Discover');
	gridCount(data.length);
	dataSave = data;
	redraw();
}
function category(name) {
  	gridTitle('Discover '+name);
	switch(name) {
      	case 'Holiday':
      	data = [
      	 	{ "title":"Deck'd", "id":"8_jr5Nf71sk", "type":"video", "tileId":100,  "user": {"id": "DominicFear", "name": "DominicFear"}, "description":"When some jerk punches Peter Bell after a well-choreographed musical number about the joys of Christmas, Peter finds himself humiliated and unsympathized by his friends and family.", "img":"http://i.ytimg.com/vi/8_jr5Nf71sk/hqdefault.jpg", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"},
      	 	{ "title":"Deck'd 2", "id":"jmcc_OwwYUc", "type":"video", "tileId":40,  "user": {"id": "DominicFear", "name": "DominicFear"}, "description":"Santa sends Peter Bell (Dom Fera) off on a mission to New York City! Chelsea Warson (Samantha Clark,) a once-great Bringer, has lost the spirit of the season, and it's up to Peter Bell to help her find it again!", "img":"http://i.ytimg.com/vi/jmcc_OwwYUc/hqdefault.jpg", "duration":{"seconds": '1088', "friendly":'18:08'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=jmcc_OwwYUc", "watched":0, "favorite":0, "src":"yt"},
			{ "title":"Deck'd 3 (Part 1)", "id":"c0HJjHthZoc", "type":"video", "tileId":40,  "user": {"id": "DominicFear", "name": "DominicFear"}, "description":"In the final, climactic musical finale to the Deck'd series, 18-year-old Peter Bell finds himself revelling in his new Christmas celebrity status. But when Peter's Christmas-adventuring pal, Hark the Herald Angel, is accused of a heinous Christmas crime, Peter lets his ego get the best of him, and finds himself arrogantly standing up to the laws of Santa Claus himself!", "img":"http://i.ytimg.com/vi/c0HJjHthZoc/hqdefault.jpg", "duration":{"seconds": '677', "friendly":'11:17'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=c0HJjHthZoc", "watched":0, "favorite":0, "src":"yt"},
			{ "title":"Year Without a Santa Claus", "id":"jPzf2CHUX1U", "type":"video", "tileId":50, "user": {"id": "inkedinRl", "name": "inkedinRl"}, "description":"Full movie", "duration":{"seconds": '3041', "friendly":'50:41'}, "seen":0, "time":"now", "views":0, "src":"yt", "img":"http://i.ytimg.com/vi/jPzf2CHUX1U/hqdefault.jpg"}

		  ];
      	break;
      	
      	case 'Featured':
      	data = [
      		{ "title":"Deck'd", "id":"8_jr5Nf71sk", "type":"video", "tileId":100,  "user": {"id": "DominicFear", "name": "DominicFear"}, "description":"When some jerk punches Peter Bell after a well-choreographed musical number about the joys of Christmas, Peter finds himself humiliated and unsympathized by his friends and family.", "img":"http://i.ytimg.com/vi/8_jr5Nf71sk/hqdefault.jpg", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"},
      	];
      	break;
 	}
 	gridCount(data.length);
 	dataSave = data;
 	redraw();
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        /* hi. */