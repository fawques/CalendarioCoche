/* Probando a relanzar los eventos de ratón desde SplitCellBackground hacia el trigger del bubbletip */

function refiring(){
	contador3 = 0;
	/*$('.bubbleInfo').bind('mouseenter',function (e){
		console.log("Ratón entra en: " + this + ", e = " + e);
		e.stopPropagation();
	});
	$('.SplitCellBackground').bind('mouseenter',function (e){
		console.log("Ratón entra en: " + this+ ", e = " + e);
		e.stopPropagation();
	});*/
	$('.holiday').bind('mouseover',function (e){
		$('.trigger',this).mouseover();
		e.stopPropagation();
	});
	/*
	$('.bubbleInfo').bind('mouseleave',function(e){
		console.log("Ratón sale de: " + this+ ", e = " + e);
		e.stopPropagation();
	});
	$('.SplitCellBackground').bind('mouseleave',function(e){
		console.log("Ratón sale de: " + this+ ", e = " + e);
		e.stopPropagation();
	});*/
	$('.holiday').bind('mouseout',function(e){
		$('.popup').mouseout();
		e.stopPropagation();
	});
}
