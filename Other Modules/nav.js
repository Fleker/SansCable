//Handle navigation of keyboard for PCs/GoogleTV
element = null;
column = 1;
//D-pad functions
function highlight(e, c) {
	element = e;
	column = c;
	if(elementExists(e)) {
		//animateItem(document.getElementsByClassName(e)[0]);
		animateItem($('.'+element));
		//$('.'+element).focus();
	}
	else
		animateItem(document.getElementsByClassName(e)[0]);
}
function moveRow(step) {
	if(menuAnimate == false) {
		if(elementExists(element.substr(0, element.indexOf("-"))+"-"+column+"_"+(row+step))) {
			unanimateItem(highlighted);
			highlight(element.substr(0, element.indexOf("-"))+"-"+column+"_"+(row+step), column, row+step, overflowL, overflowR);
		}
		else {
			if(step < 0)
				eval(overflowL);
			else if(step > 0)
				eval(overflowR);
		}
	}
}
function moveCol(step) {
  	console.log(element.substr(0, 1)+(parseInt(column)+step));
	var e = element.substr(0, 1)+(parseInt(column)+step);
	if(elementExists(e)) {
		highlight(e, parseInt(column)+step);
	}
	
	if(menuAnimate == false && false) {
		if(elementExists(element.substr(0, 1)+(parseInt(column)+step))) {
			unanimateItem(highlighted);
			highlight(element.substr(0, 1)+(parseInt(column)+step), parseInt(column)+step);
		}
		else if(elementExists(element.substr(0, 1))+(parseInt(column))) {
        	unanimateItem(highlighted);
			highlight(element.substr(0, 1)+(parseInt(column)), parseInt(column));
  		}
  		else if(elementExists(element.substr(0, 1)+(1))) {
        	unanimateItem(highlighted);
			highlight(element.substr(0, 1)+(1), parseInt(1));
  		}
	}
}

//Animation
borderColor = '#00aaff';
highlighted = null;
function animateItem(object) {
  	if(object != null) {
      	//console.warn(object)
    	highlighted = object;
    	//short hack right here
    		if(object.id != undefined && object.id.substr(0,1) == 'm' && object.id.length == 5 && menuPushed == false)
    			pushMenu();
     	jQuery(object).animate({
    	      backgroundColor: /*jQuery.Color(200,200,200)*/ "#484848",
    	      borderLeftColor: borderColor,
    	      borderRightColor: borderColor,
    	      borderTopColor: borderColor,
    	      borderBottomColor: borderColor
    	  }, 500 );

	 //search
	 if(object.id == 'm1')
	 	$('#sidebar_search').focus();
	 else
        $('#sidebar_search').blur();
    //other input
    	$('#canvas_input').blur();
    }
}     	
function unanimateItem(object) {
 	jQuery(object).animate({
	      backgroundColor: "#282828",
	      borderLeftColor: "#000000",
	      borderRightColor: "#000000",
	      borderTopColor: "#000000",
	      borderBottomColor: "#000000"
	}, 500 );
}

//Misc. Functions
function elementExists(id) {
	if (document.getElementById(id) != null || document.getElementsByClassName(id).length > 0)
	{
		return true;
	}	
	else
		return false;
}
//nonessential-misc. functions
function switchContent() {
	unanimateItem(highlighted);
	c = column;
	pullMenu();
	highlight("t"+c, c);
	$('#sample2-templates').fadeOut(500);
}
function switchMenu() {
	c = column;
	highlight("m"+c, c);
	if(!menuPushed)
		pushMenu();
}
function switchView() {
	unanimateItem(highlighted);
	highlight("v1", 1);
	$('#sample2-templates').fadeIn(500);
}

//set-up
//non-vital
switchMenu();
pushMenu();
