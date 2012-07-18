/* Probando a relanzar los eventos de ratón desde SplitCellBackground hacia el trigger del bubbletip */

function refiring(){
	$('.bubbleInfo').bind('mouseenter',function (e){
		console.log("Ratón entra en: " + this + ", e = " + e);
		e.stopPropagation();
	});
	$('.SplitCellBackground').bind('mouseenter',function (e){
		console.log("Ratón entra en: " + this+ ", e = " + e);
		e.stopPropagation();
	});
	$('.holiday').bind('mouseenter',function (e){
		console.log("Ratón entra en: " + this+ ", e = " + e);
		e.stopPropagation();
	});
	
	$('.bubbleInfo').bind('mouseleave',function(e){
		console.log("Ratón sale de: " + this+ ", e = " + e);
		e.stopPropagation();
	});
	$('.SplitCellBackground').bind('mouseleave',function(e){
		console.log("Ratón sale de: " + this+ ", e = " + e);
		e.stopPropagation();
	});
	$('.holiday').bind('mouseleave',function(e){
		console.log("Ratón sale de: " + this+ ", e = " + e);
		e.stopPropagation();
	});
}
