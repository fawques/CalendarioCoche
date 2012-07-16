/* Probando a relanzar los eventos de ratón desde SplitCellBackground hacia el trigger del bubbletip */

function refiring(){
	$('.bubbleInfo').live('mouseover',function(e){
		$('.trigger',this).mouseover();
		e.stopPropagation();
	});
	$('.SplitCellBackground').live('mouseover',function(e){
		$('.bubbleInfo',this).mouseover();
		e.stopPropagation();
	});
	$('.holiday').live('mouseover',function(){
		$('.SplitCellBackground',this).trigger('mouseover');
		e.stopPropagation();
	});
	
	$('.bubbleInfo').live('mouseout',function(e){
		$('.trigger',this).mouseout();
		e.stopPropagation();
	});
	$('.SplitCellBackground').live('mouseout',function(e){
		$('.bubbleInfo',this).mouseout();
		e.stopPropagation();
	});
	$('.holiday').live('mouseout',function(){
		$('.SplitCellBackground',this).mouseout();
		e.stopPropagation();
	});
}
