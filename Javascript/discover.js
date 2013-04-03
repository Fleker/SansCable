function discoverTop() {
  	//gridClear();
	data = [
		/*{ "title":"Top Recent", "id":"Top Recent", "type":"category", "tileId":100,  "user": {"id": "", "name": "The top videos online right now"}, "description":"The top videos from YouTube right now are here", "img":"../design/discover/featured.png", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},*/
		{ "title":"Your Dailies", "id":"Your Dailies", "type":"category", "tileId":100,  "user": {"id": "", "name": "Your newest fifty"}, "description":"Your fifty most recent videos", "img":"http://placehold.it/200&text=Dailies", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                { "title":"Your Flicks", "id":"Your Flicks", "type":"category", "tileId":100,  "user": {"id": "", "name": "Your longest videos"}, "description":"Your longest videos, short films", "img":"http://placehold.it/200&text=Flicks", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                { "title":"Top Daily", "id":"Top Daily", "type":"category", "tileId":100,  "user": {"id": "", "name": "The top videos online right now"}, "description":"The top videos from YouTube right now are here", "img":"../design/discover/featured.png", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                { "title":"Top Viewed", "id":"Top Viewed", "type":"category", "tileId":100,  "user": {"id": "", "name": "Highest viewed videos of all time"}, "description":"The top videos from YouTube right now are here", "img":"../design/discover/featured.png", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
		/*{ "title":"Holiday", "id":"Holiday", "type":"category", "tileId":100,  "user": {"id": "", "name": "Celebrate the season!"}, "description":"Celebrate the season with these holiday videos!", "img":"../design/discover/christmas.png", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                */{ "title":"Featured", "id":"Featured", "type":"category", "tileId":100,  "user": {"id": "", "name": "Best of the best"}, "description":"Hand-picked videos, the best of YouTube, are shown here", "img":"../design/discover/featured.png", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                  { "title":"Action", "id":"Action", "type":"category", "tileId":100,  "user": {"id": "", "name": "Action and Adventure"}, "description":"For fans of explosions", "img":"http://placehold.it/200&text=Action", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                  { "title":"Entertainment", "id":"Entertainment", "type":"category", "tileId":100,  "user": {"id": "", "name": "Misc. Videos"}, "description":"For various videos", "img":"http://placehold.it/200&text=Entertainment", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                  { "title":"Music", "id":"Music", "type":"category", "tileId":100,  "user": {"id": "", "name": "Bands and Tunes"}, "description":"For all music lovers", "img":"http://placehold.it/200&text=Music", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                  { "title":"Short Films", "id":"Short Films", "type":"category", "tileId":100,  "user": {"id": "", "name": "High-Quality YouTube"}, "description":"For the best video makers", "img":"http://placehold.it/200&text=Films", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                  { "title":"Technology", "id":"Technology", "type":"category", "tileId":100,  "user": {"id": "", "name": "Smartphones and the web"}, "description":"For techies and hipsters", "img":"http://placehold.it/200&text=Tech", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                  { "title":"Video Games", "id":"Video Games", "type":"category", "tileId":100,  "user": {"id": "", "name": "Lets Plays and Trailers"}, "description":"For nerds and geeks", "img":"http://placehold.it/200&text=Video+Games", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"}
                    ];
	gridTitle('Discover - <a href="https://docs.google.com/forms/d/10XWU5iYH29nevnUZr_TFqwwj8JJMLqAgIZNrYJ4u3i8/viewform" target="_blank">Suggest</a>');
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
        
        case 'Action':
        data = [
            { "title":"Freddie Wong", "id":"FreddieW", "type":"user", "tileId":100,  "user": {"id": "freddiew", "name": "FreddieW"}, "description":"", "img":"http:\/\/i1.ytimg.com\/i\/DsO-0Yo5zpJk575nKXgMVA\/1.jpg?v=bb31cf", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"} 
            
        ];
        break;
        
        case 'Entertainment':
        data = [
            { "title":"DFear Studios", "id":"Dominicfear", "type":"user", "tileId":100,  "user": {"id": "dominicfear", "name": "Dominic Fera"}, "description":"", "img":"http:\/\/i2.ytimg.com\/i\/uInCtO3ampjhV_PYd1qJCA\/1.jpg?v=ada5b4", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"} 
            
        ];
        break;
        
        case 'Music':
        data = [
                { "title":"Blow Your Head", "id":"B7erPprkMQXhkmIdzfhGDlAcRuIxIFoe", "type":"group", "tileId":100,  "user": {"id": "", "name": "POTATOwillEATyou"}, "description":"", "img":"http://i.ytimg.com/vi/kd2JTWX3LCU/hqdefault.jpg", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"},     
                { "title":"MysteryGuitarMan", "id":"MysteryGuitarMan", "type":"user", "tileId":100,  "user": {"id": "mysteryguitarman", "name": "mysteryguitarman"}, "description":"", "img":"http:\/\/lh6.googleusercontent.com\/-GOF8z9EtCP8\/AAAAAAAAAAI\/AAAAAAAAAAA\/FGsRtvl_BU8\/s88-c-k\/photo.jpg", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"} 
            
        ]
        break; 
        
        case 'Programming':
        data = [
                { "title":"DevBytes", "id":"Wz5rJ2EKKc_XOgcRukSoKKjewFJZrKV0", "type":"group", "tileId":100,  "user": {"id": "androiddevelopers", "name": "androiddevelopers"}, "description":"When some jerk punches Peter Bell after a well-choreographed musical number about the joys of Christmas, Peter finds himself humiliated and unsympathized by his friends and family.", "img":"http://i.ytimg.com/vi/_UWXqFBF86U/hqdefault.jpg", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"},     
                { "title":"PHPAcademy", "id":"phpacademy", "type":"user", "tileId":100,  "user": {"id": "phpacademy", "name": "PHP Tutorials"}, "description":"", "img":"http:\/\/i1.ytimg.com\/i\/pOIUW62tnJTtpWFABxWZ8g\/1.jpg?v=4ef79d3e", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"}          
        ];
      	break; 
        
        case 'Short Films':
        data = [ 
                { "title":"The End", "id":"VESAIuEJ9T4", "type":"video", "tileId":50, "user": {"id": "dominicfear", "name": "dominicfear"}, "description":"In this supernatural love story, 17-year-old Brendon McKellar is instantly shown the end of his relationship with any new person he meets-- whether he wants to see it or not. Unable to change the fates that his strange ability reveals, Brendon's only options are to either succumb to the will of the universe and face inevitable heartbreak, or simply avoid each new path completely.", "duration":{"seconds": '1497', "friendly":'24:57'}, "seen":0, "time":"now", "views":0, "src":"yt", "img":"http://i.ytimg.com/vi/VESAIuEJ9T4/hqdefault.jpg"}
        ];
        break;
        
        case 'Technology': 
        data = [
                { "title":"Programming", "id":"Programming", "type":"category", "tileId":100,  "user": {"id": "", "name": "Programming Tips and Tricks"}, "description":"Guides and tutorials", "img":"http://placehold.it/200&text=Programming", "duration":{"seconds": '', "friendly":''}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=T7MDMdfcRfI", "watched":0, "favorite":0, "src":"yt"},
                { "title":"90 Seconds on The Verge", "id":"A206E7ADE1517285", "type":"group", "tileId":100,  "user": {"id": "theverge", "name": "Daily tech news fast"}, "description":"", "img":"http:\/\/i.ytimg.com\/vi\/AbVCoGIcLeI\/hqdefault.jpg", "duration":{"seconds": '0', "friendly":' '}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"},            
                { "title":"App Clinic", "id":"B7B9B23D864A55C3", "type":"group", "tileId":100,  "user": {"id": "androiddevelopers", "name": "androiddevelopers"}, "description":"When some jerk punches Peter Bell after a well-choreographed musical number about the joys of Christmas, Peter finds himself humiliated and unsympathized by his friends and family.", "img":"http://i.ytimg.com/vi/q-Q2uU6CbGQ/hqdefault.jpg", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"},            
                { "title":"Armando Ferreira", "id":"wicked4u2c", "type":"user", "tileId":100,  "user": {"id": "wicked4u2c", "name": "Armando Ferreira"}, "description":"", "img":"http:\/\/lh5.googleusercontent.com\/-BGGegSk41aE\/AAAAAAAAAAI\/AAAAAAAAAAA\/XKib6AIVzV8\/s88-c-k\/photo.jpg", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"}, 
                { "title":"Nixie Pixel Does Linux", "id":"nixiedoeslinux", "type":"user", "tileId":100,  "user": {"id": "nixiedoeslinux", "name": "Open Source Software"}, "description":"", "img":"http:\/\/i3.ytimg.com\/i\/BE-FO9JUOghSysV9gjTeHw\/1.jpg?v=4f3c90ff", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"}, 
                { "title":"The Verge", "id":"theverge", "type":"user", "tileId":100,  "user": {"id": "theverge", "name": "News and Hands-On"}, "description":"", "img":"http:\/\/i1.ytimg.com\/i\/ddiUEpeqJcYeBxX1IVBKvQ\/1.jpg?v=513e43dc", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"}, 
                
        ];
        break; 
        
        case 'Video Games':
        data = [
                { "title":"COPS: Skyrim", "id":"3F85878A2CA41ABE", "type":"group", "tileId":100,  "user": {"id": "nerdist", "name": "Skyrim-based Show"}, "description":"", "img":"http:\/\/i.ytimg.com\/vi\/Uwh4UxtcVaY\/hqdefault.jpg", "duration":{"seconds": '840', "friendly":'14:00'}, "seen":0, "time":"now", "views":0, "url":"https://www.youtube.com/watch?v=8_jr5Nf71sk", "watched":0, "favorite":0, "src":"yt"},            
        ];
        break;
        
        case 'Your Dailies':
                        refreshDB('fifty');
        break;
        
        case 'Your Flicks':
            refreshDB('flicks');
        break;
        
      	case 'Top Recent':
			dataRecFeed();
      	break;

      	case 'Top Daily':
			dataDayFeed();
      	break;

      	case 'Top Viewed':
			dataPopFeed();
      	break;
 	}
 	gridCount(data.length);
 	dataSave = data;
 	redraw();
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        /* hi. */