/* Probando a relanzar los eventos de ratón desde SplitCellBackground hacia el trigger del bubbletip */

function refiring(){
	$('.bubbleInfo').bind('mouseenter',function(e){
		$('.trigger',this).mouseenter();
		e.stopPropagation();
	});
	$('.SplitCellBackground').bind('mouseenter',function(e){
		$('.bubbleInfo',this).mouseenter();
		e.stopPropagation();
	});
	$('.holiday').bind('mouseenter',function(e){
		$('.SplitCellBackground',this).mouseenter();
		e.stopPropagation();
	});
	
	$('.bubbleInfo').bind('mouseleave',function(e){
		$('.trigger',this).mouseleave();
		e.stopPropagation();
	});
	$('.SplitCellBackground').bind('mouseleave',function(e){
		$('.bubbleInfo',this).mouseleave();
		e.stopPropagation();
	});
	$('.holiday').bind('mouseleave',function(e){
		$('.SplitCellBackground',this).mouseleave();
		e.stopPropagation();
	});
}
