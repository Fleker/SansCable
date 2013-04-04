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

$(function() {

    // create a custom Tile which customizes the resize behavior
    function CustomTile(tileId, element) {
        // initialize base
        Tiles.Tile.call(this, tileId, element);
    }

    CustomTile.prototype = new Tiles.Tile();
    
    CustomTile.prototype.resize = function(cellRect, pixelRect, animate, duration, onComplete) {

        // set the text inside the tile to the dimensions
        var cellDimensions = cellRect.width + ' x ' + cellRect.height;
        for(tileId in TILE_IDS) {
			data[tileId].tileId = tileId;
		}
        if(cellDimensions == '6 x 1') {
        	for(tileId in TILE_IDS) { /*List View*/
        		//looks best at >=1000 width
				//this.$el.find('#dev-tile-n'+tileId).html('<div class="dev-tile-block" style="background-image:url('+data[tileId].img+');background-size:contain;background-repeat:no-repeat;height:100%"></div><div class="dev-tile-bgl"><div class="dev-tile-numberl"><span class="dev-tile-data"><font style="font-size:17pt">' + data[tileId].title + '</font><br><font style="font-size:9pt">' + data[tileId].user + '<br>' + data[tileId].duration + ' - Added '+ data[tileId].time +'</font></span></div></div>');
				out = '<div class="dev-tile-block"><table class="listitem" style="background-color:black;color:white"><tr><td width="20%">';
				if(data[tileId].ad == 1) {
                  	out = out + '<div class="tileAd">ADVERT</div>';
                	out = out + '<img src="'+data[tileId].img+'" style="width:100%;margin-top:-28px;"/>';
   				}
   				else if(data[tileId].live == 1) {
                  	out = out + '<div class="tileLive">LIVE</div>';
                	out = out + '<img src="'+data[tileId].img+'" style="width:100%;margin-top:-28px;"/>';
   				}
				else if(data[tileId].watched == 1 && !data[tileId].favorite == 1) {
                	out = out + '<div class="tileWatch">WATCHED</div>';
                	out = out + '<img src="'+data[tileId].img+'" style="width:100%;margin-top:-28px;"/>';
    			}
				else if(data[tileId].favorite == 1 && !data[tileId].watched == 1) {
                	out = out + '<div class="tileFav">FAVORITE</div>';
                	out = out + '<img src="'+data[tileId].img+'" style="width:100%;margin-top:-28px;"/>';
				}
				else if(data[tileId].favorite == 1 && data[tileId].watched == 1) {
                	out = out + '<table style="width:100%;margin-top:-2px;';
					out = out + '"><tr><td style="font-size:16px;" class="tileWatch">WATCHED</td>';
					out = out + '<td style="font-size:16px;" class="tileFav">FAVORITE</td></table>';
                	out = out + '<img src="'+data[tileId].img+'" style="width:100%;margin-top:-28px;"/>';
				}
				else {
					out = out + '<img src="'+data[tileId].img+'" style="width:100%"/>';
				}
				out = out + '</td><td width="40%"><span class="dev-tile-data"><font class="bigFont">' + data[tileId].title + '</font><br><font style="font-size:9pt">' + data[tileId].user.name + '<br>' + data[tileId].duration.friendly + ' - Added '+ data[tileId].time +'</font></span></td><td width="40%"><div width="100%" style="height: '+193+'px;overflow-y:hidden" class="listblock">'+data[tileId].description+'</div></td></tr></table></div>';
				this.$el.find('#dev-tile-n'+tileId).html(out);
			}
			orientation_switch = 'n';
		}
		/*else if(cellDimensions == '2 x 1') { /*Phone View
			tileId = 0;
			for(tileId in TILE_IDS) {
				if(window.innerHeight > window.innerWidth) {
					out ='<div class="dev-tile-block" style="text-align: center;background-color: black;height: 100%"><div style="height:100%;background-color:black;">';
					if(data[tileId].watched == 1)
						out = out + '<div class="tileWatch">WATCHED</div>';
					if(data[tileId].favorite == 1)
						out = out + '<div class="tileFav">FAVORITE</div>';
					out = out + '<img src="'+data[tileId].img+'" style="width:160px;background-color:black;"/></div> <div class="dev-tile-numberp" style="margin-top: -40%;color:white;height:100%;background-color:black;"><span class="dev-tile-data"><font class="font-outline bigFont">' + overflowTitle(data[tileId].title) + '</font><br><font class="font-outline-small smallFont">' + data[tileId].user.name + '<br>' + data[tileId].duration.friendly + ' - Added '+ data[tileId].time +'</font></span></div></div>';
                    this.$el.find('#dev-tile-n'+tileId).html(out);

				}
				else {
					out = '<div class="dev-tile-block" style="text-align: center;background-color: black;height: 100%"><span style="height:105%;background-color:black;">';
					if(data[tileId].watched == 1)
						out = out + '<div class="tileWatch">WATCHED</div>';
					if(data[tileId].favorite == 1)
						out = out + '<div class="tileFav">FAVORITE</div>';
					out = out + '<img src="'+data[tileId].img+'" style="width:50%; background-color:black;"/></span> <div class="dev-tile-numberp" style="margin-top: -25%;color:white;height:105%;background-color:black;"><span class="dev-tile-data"><font class="font-outline bigFont">' + overflowTitle(data[tileId].title) + '</font><br><font class="font-outline-small smallFont">' + data[tileId].user.name + '<br>' + data[tileId].duration.friendly + ' - Added '+ data[tileId].time +'</font></span></div></div>'
                    this.$el.find('#dev-tile-n'+tileId).html(out);
				}
			}
        }*/
		else {
			for(tileId in TILE_IDS) { /*Tiles*/
				out = '';

				if(data[tileId].ad == 1) {
                   	out = out + '<div class="tileAd tileHeader">ADVERT</div>';
					out = out +'<div class="dev-tile-block" class="'+DemoClassRows[i]+'" style="background-image:url('+data[tileId].img+');background-size:cover;height:100%;margin-top:-28px"></div>';
				}
				else if(data[tileId].live == 1) {
                  	out = out + '<div class="tileLive tileHeader">LIVE</div>';
					out = out +'<div class="dev-tile-block" class="'+DemoClassRows[i]+'"style="background-image:url('+data[tileId].img+');background-size:cover;height:100%;margin-top:-28px"></div>';
				}
				else if(data[tileId].watched == 1 && !data[tileId].favorite == 1) {
					out = out + '<div class="tileWatch tileHeader">WATCHED</div>';
					out = out +'<div class="dev-tile-block" class="'+DemoClassRows[i]+'" style="background-image:url('+data[tileId].img+');background-size:cover;height:100%;margin-top:-28px"></div>';

				}
				else if(data[tileId].favorite == 1 && !data[tileId].watched == 1) {
					out = out + '<div class="tileFav tileHeader">FAVORITE</div>';
					out = out +'<div class="dev-tile-block" class="'+DemoClassRows[i]+'" style="background-image:url('+data[tileId].img+');background-size:cover;height:100%;margin-top:-28px"></div>';

				}
				else if(data[tileId].favorite == 1 && data[tileId].watched == 1) {
					out = out + '<table style="width:100%;margin-top:-2px;';
					if(cellDimensions == '2 x 2')
						out = out + 'margin-left:-2px';
					out = out + '"><tr><td style="font-size:16px;" class="tileWatch">WATCHED</td>';
					out = out + '<td style="font-size:16px;" class="tileFav">FAVORITE</td></table>';
					out = out +'<div class="dev-tile-block" class="'+DemoClassRows[i]+'" style="background-image:url('+data[tileId].img+');background-size:cover;height:100%;margin-top:-32px"></div>';
				}
				else if(data[tileId].social != undefined) {
                 	out = out + '<div class="tileSocial tileHeader">'+data[tileId].social+'</div>';
					out = out +'<div class="dev-tile-block" class="'+DemoClassRows[i]+'" style="background-image:url('+data[tileId].img+');background-size:cover;height:100%;margin-top:-28px"></div>';
    			}
				else
					out = out +'<div class="dev-tile-block" class="'+DemoClassRows[i]+'" style="background-image:url('+data[tileId].img+');background-size:cover;height:100%;"></div>';

				out = out + '<div class="dev-tile-bg" id="tileBg'+tileId+'"></div><div class="dev-tile-number" onmouseover="vidExpand('+tileId+');" onmouseout="vidRetract('+tileId+');"><span class="dev-tile-data"><font class="bigFont">' + data[tileId].title + '</font><br><font class="smallFont">' + data[tileId].user.name + '<br>' + data[tileId].duration.friendly + ' - Added '+ data[tileId].time +'</font></span></div>';
                this.$el.find('#dev-tile-n'+tileId).html(out);
			}
			orientation_switch = 'n';
		}

        // call the base to perform the resize
        Tiles.Tile.prototype.resize.call(
            this, cellRect, pixelRect, animate, duration, onComplete);
    };


    var el = document.getElementById('sample2-grid'),
        grid = new Tiles.Grid(el);

    // template is selected by user, not generated so just
    // return the number of columns in the current template
    grid.resizeColumns = function() {
        return this.template.numCols;
    };

    // we'll override creation to use our custom tile
    var i = 0;
    grid.createTile = function(tileId) {
        var tile = new CustomTile(tileId);
        //tile.$el.append('<div class="dev-tile-block" style="background-image:url('+data[tileId].img+');background-size:cover;height:100%"></div><div class="dev-tile-bg" id="tileBg'+tileId+'"></div><div class="dev-tile-number" onmouseover="vidExpand('+tileId+');" onmouseout="vidRetract('+tileId+');"><span class="dev-tile-data"><font style="font-size:17pt">' + data[tileId].title + '</font><br><font style="font-size:9pt">' + data[tileId].user + '</font></span></div>');
        tile.$el.append('<span id="dev-tile-n'+tileId+'" class="tile" onclick="tileAction('+tileId+')"></span>');
        i++;
		return tile;
    };

    // update the template selection
    var $templateButtons = $('#sample2-templates .dev-template').on('click', function(e) {

        // unselect all templates
        $templateButtons.removeClass("selected");
        
        // select the template we clicked on
        //console.log(e.target.id);
        $(e.target).addClass("selected");
        
        // get the JSON rows for the selection
        window.gridindex = $(e.target).index(),
            rows = DemoTemplateRows[gridindex];

        // set the new template and resize the grid
        grid.template = Tiles.Template.fromJSON(rows);
        grid.isDirty = true;
        grid.resize();

        // adjust number of tiles to match selected template
        var ids = TILE_IDS.slice(0, grid.template.rects.length);
        grid.updateTiles(ids);
        grid.redraw(true);
    });
    window.grid = grid;

    // make the initial selection
    initialTile();
    //$('#sample2-t1').trigger('click');
    
    // wait until users finishes resizing the browser
    var debouncedResize = debounce(function() {
        grid.resize();
        grid.redraw(true);
    }, 200);

    // when the window resizes, redraw the grid
    $(window).resize(debouncedResize);

});
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
			
		DemoTemplateRows[0] = new Array();
        for(j=0;j<data.length / 6;j++) {
			DemoTemplateRows[0].push(". . . . . .");
			for(k=0;k<=6;k++) {
				//DemoClassRows.push('c-'+j+'_'+k);
			}
		}	
			
           DemoTemplateRows[1] = new Array();
        for(j=0;j<data.length / 6;j++) {
			DemoTemplateRows[1].push(". . . . . .");
			for(k=0;k<=6;k++) {
				//DemoClassRows.push('c-'+j+'_'+k);
			}
		}
	DemoTemplateRows[2] = new Array();
		for(j=0;j<data.length;j++) {
			if(j/2 != parseInt(j/2))
				DemoTemplateRows[2].push('A A A A A A');
			else
				DemoTemplateRows[2].push('B B B B B B');
			DemoClassRows.push('c-'+(j+1)+'_'+1);
		}
	//}
	//else if(window.device.mobile) {
			DemoTemplateRows[3] = new Array();
		for(j=0;j<data.length/2;j++) {
			if(j/2 != parseInt(j/2))
				DemoTemplateRows[3].push('A A B B');
			else
				DemoTemplateRows[3].push('B B A A');
			//DemoClassRows.push('c-'+j+'_'+1);
			//DemoClassRows.push('c-'+j+'_'+2);
		}
			DemoTemplateRows[4] = new Array();
		for(j=0;j<data.length;j++) {
			if(j/2 != parseInt(j/2))
    			DemoTemplateRows[4].push('A A');
			else
    			DemoTemplateRows[4].push('B B');
			//DemoClassRows.push('c-'+j+'_'+1);
		}
	//}
	//else {
			DemoTemplateRows[5] = new Array();
		for(j=0;j<data.length;j++) {
			if(j/2 != parseInt(j/2))
				DemoTemplateRows[5].push('A A B B C C D D');
			else
				DemoTemplateRows[5].push('B B C C D D E E');
		}
			DemoTemplateRows[6] = new Array();
		for(j=0;j<data.length;j++) {
			if(j/2 != parseInt(j/2))
				DemoTemplateRows[6].push('A A A A A');
			else
				DemoTemplateRows[6].push('B B B B B');
		}
	//}

    	grid.template = Tiles.Template.fromJSON(DemoTemplateRows[window.gridindex]);
        grid.isDirty = true;
        grid.resize();

        // adjust number of tiles to match selected template
        var ids = TILE_IDS.slice(0, grid.template.rects.length);
        grid.updateTiles(ids);
        grid.redraw(true);
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
}
function gridTitle(n) {
 	$('#gridTitle').html(n);
}
function gridRefresh() {
 	grid.template = Tiles.Template.fromJSON(DemoTemplateRows[window.gridindex]);
        grid.isDirty = true;
        grid.resize();

        // adjust number of tiles to match selected template
        var ids = TILE_IDS.slice(0, grid.template.rects.length);
        grid.updateTiles(ids);
        grid.redraw(true);
}