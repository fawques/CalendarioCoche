

var ui = {

	// Render the Calendar
	"renderCalendar" : function(mm,yy){
		
		// HTML renderers
		var _html = "";
		var cls = "";
		
		var id = "";
		var personaman = "";
		var motivoman = "";
		var personatar = "";
		var motivotar = "";
		
		// Create current date object
		var now = new Date();
		
		// Defaults
		if(arguments.length == 0){
			mm = now.getMonth();
			yy = now.getFullYear();
		}
		
		// Create viewed date object
		var mon = new Date(yy,mm,1);
		var yp=mon.getFullYear();
		var yn=mon.getFullYear();
		
		var prv = new Date(yp,mm-1,1);
		var nxt = new Date(yn,mm+1,1);
		
		var m = [
			 "Enero"
			,"Febrero"
			,"Marzo"
			,"Abril"
			,"Mayo"
			,"Junio"
			,"Julio"
			,"Agosto"
			,"Septiembre"
			,"Octubre"
			,"Noviembre"
			,"Diciembre"
		];
		
		var d = [
			"Lunes"
			,"Martes"
			,"Miércoles"
			,"Jueves"
			,"Viernes"
			,"Sábado"
			,"Domingo"
		];
		
		// Days in Month
		var n = [
			 31
			,28
			,31
			,30
			,31
			,30
			,31
			,31
			,30
			,31
			,30
			,31
		];
		
		// Events
		//var evnt = //function(){
			var evnt = {};
			$.ajax({
					url:"reservas.php",
					async:false,
					success:function(data, textStatus, xmlhttprequest){
						evnt = {"event":$.parseJSON(xmlhttprequest.responseText)};
					}
			});
			
			
			
			/*
			var evnt = {"event" : [
			 {"date":"2012-12-25","title":"Christmas","periodo":"Tarde"}
			,{"date":"2012-1-01","title":"New Year's Day","periodo":"Mañana"}
			,{"date":"2012-11-22","title":"Thanksgiving"}
			,{"date":"2012-9-03","title":"Labor Day"}
			,{"date":"2012-7-04","title":"Independence Day"}
			,{"date":"2012-5-28","title":"Memorial Day"}
			,{"date":"2012-2-28","title":"President's Day"}
		]};*///}();
	
		// Leap year
		if(now.getYear()%4 == 0){
			n[1] = 29;
		}
		
		// Get some important days
		var fdom = mon.getDay()-1; // First day of month
		if(fdom == -1)//Making it Spanish
			fdom = 6;
		var mwks = 6 // Weeks in month
		
		// Render Month
		$('.year').html(mon.getFullYear());
		$('.month').html(m[mon.getMonth()]);
		
		// Clear view
		var h = $('#calendar > thead:last');
		var b = $('#calendar > tbody:last');
		
		h.empty();
		b.empty();
		
		// Render Days of Week
		for(var j=0;j<d.length;j++){
			_html += "<th>" +d[j]+ "</th>";
		}
		_html = "<tr>" +_html+ "</tr>";
		h.append(_html);
		
		// Render days
		var dow = 0;
		var first = 0;
		var last = 0;
		for(var i=0;i>=last;i++){
			
			_html = "";
			
			for(var j=0;j<d.length;j++){
				
				cls = "";
				personaman = "";
				motivoman = "";
				personatar = "";
				motivotar = "";
				id = "";
				
				// Determine if we have reached the first of the month
				if(first >= n[mon.getMonth()]){
					dow = 0;
				}else if((dow>0 && first>0) || (j==fdom)){
					dow++;
					first++;
				}
				
				// Format Day of Week with leading zero
				dow = "0" + dow;
				
				// Get last day of month
				if(dow==n[mon.getMonth()]){
					last = n[mon.getMonth()];
				}
				
				var tarde = false;
				var manana = false;
				// Check Event schedule
				$.each(evnt.event,function(){	
					if(this.date == mon.getFullYear() 
							+ "-"
							+ (function(){var aux = mon.getMonth()+1;
										if(aux < 10)
											return "0"+aux
										else
											return aux})()
							+ "-" + dow.substr(-2))
					{
						if(this.periodo == "tar"){
							tarde = true;
							personatar = this.title;
							motivotar = this.motivo;
						}else if (this.periodo == "ma"){
							manana = true;
							personaman = this.title;
							motivoman = this.motivo;
						}
						cls = "holiday";
					}
				});
				
				
				// Set class
				if(cls.length == 0){
					if(
						dow==now.getDate() 
						&& now.getMonth() == mon.getMonth() 
						&& now.getFullYear() == mon.getFullYear()
					){
						cls = "today";
					}else if(j == 5 || j == 6){
						cls = "weekend";
					}else{
						cls = "";
					}
				}
				
				// Set ID
				id = "cell_" + i + "" + j + "" + dow;
				
				// Render HTML
				if(dow == 0){
					_html += '<td>&nbsp;</td>';
				}else if(personaman.length > 0 || personatar.length > 0){
					var auxiliar = new Date(mon);
					_html += '<td onclick="javascript:reservar(' + auxiliar.setDate(dow.substr(-2)) + ');" class="' + cls + ' fondopartido" id="'+id+'">' 
								+ '<span class="day">' + dow.substr(-2) + '</span>'
								+ '<br/>'
					if(tarde){
						if(manana){
							_html += '<div class="SplitCellBackground">'
								+ '<div class="bubbleInfo">'
									+ '<div class="trigger" data-day="' + auxiliar + '" data-tarpers="' + personatar + '" data-tarmsg="' + motivotar + '" data-manpers="' + personaman + '" data-manmsg="' + motivoman + '">'
										+ '<div class="TopOfCell">&nbsp;</div>' 
										+ '<div class="BottomOfCell">&nbsp;'
										+ '<\/div>'
									+'</div>'
								+ '</div>'
							+ '</div>'
						}
						else{
							_html += '<div class="SplitCellBackground">'
									+ '<div class="bubbleInfo">'
										+ '<div class="trigger" data-day="' + auxiliar + '" data-tarpers="' + personatar + '" data-tarmsg="' + motivotar + '" data-manpers="" data-manmsg="">'
											+ '<div class="TopOfCellNo">&nbsp;<\/div>' 
											+ '<div class="BottomOfCell">&nbsp;'
											+ '<\/div>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
						}
					}
					else if(manana){
						_html += '<div class="SplitCellBackground">'
									+ '<div class="bubbleInfo">'
										+ '<div class="trigger" data-day="' + auxiliar + '" data-manpers="' + personaman + '" data-manmsg="' + motivoman + '" data-tarpers="" data-tarmsg="">'
											+ '<div class="TopOfCell">&nbsp;</div>' 
											+'<div class="BottomOfCellNo">&nbsp;<\/div>'
										+ '</div>'
									+ '</div>'
								+ '</div>'
					}
					_html += '</td>';
				}else{
					var auxiliar = new Date(mon);
					_html += '<td onclick="javascript:reservar(' + auxiliar.setDate(dow.substr(-2)) + ');"  class="' +cls+ '" id="'+id+'">' + dow.substr(-2) + '</td>';
				}
				
			}
			_html = "<tr>" +_html+ "</tr>";
			b.append(_html);
			
		}
		
		$('#last').unbind('click').bind('click',function(){
			ui.renderCalendar(prv.getMonth(),prv.getFullYear());
		});
		
		$('#current').unbind('click').bind('click',function(){
			ui.renderCalendar(now.getMonth(),now.getFullYear());
		});
		
		$('#next').unbind('click').bind('click',function(){
			ui.renderCalendar(nxt.getMonth(),nxt.getFullYear());
		});
		
		ajustarColores();
		bubbleInit();
	},
	
	/*
	// Render Clock
	"renderTime" : function(){
		var now = new Date();
		
		var tt = "AM";
		var hh = now.getHours();
		var nn = "0" + now.getMinutes();
		
		if(now.getHours()>12){
			hh = now.getHours()-12;
			tt = "PM";
		}
		
		$('.time').html(
			hh + ":" + nn.substr(-2) + " " + tt
		);
		
		var doit = function(){
			ui.renderTime();
		}
		
		setTimeout(doit,500);
	},*/
	
	
	// Initialization
	"init" : function(){
	}
	
};

function reservar(dia){
	if(logged)
	{
		/*$('.popup').unbind('mouseover').unbind('mouseout');
		$('.trigger').unbind('mouseover').unbind('mouseout');*/
		var aux = new Date(dia);
		$('#diaModal').html(aux.getDate() + "/" + (aux.getMonth()+1) + "/" + aux.getFullYear());
		
		$('#fecha').val(aux.getFullYear() + "-" + (aux.getMonth()+1) + "-" + aux.getDate());
		
		$('#persona').val(nombre);
		
		$('.nuevaReserva').css({
			opacity:0,
			display:'block'
		})
		.animate({
			opacity : 1
		}, 500, 'swing');
		
		/*bubbleInit();*/
	}
}

function ajustarColores(){
	// prueba para ajustar el color de TopOfCell y BottomOfCell a su celda correspondiente:
	var zCellsToBackgroundify = $("td.fondopartido");

	//--- Set each cell's funky background.
	zCellsToBackgroundify.each (function (idx) {
		zJnode = $(this);
		var zCellBG_Frame                       = zJnode.find ('div.SplitCellBackground');

        //--- Set the background container to match the cell dimensions.
        zCellBG_Frame[0].style.width            = zJnode.outerWidth  (false) + 'px';
        zCellBG_Frame[0].style.height           = zJnode.outerHeight (false) + 'px';

        //--- Position absolutely; Adjust for margin, if needed.
        var aContentPos                         = zJnode.offset ();

        //--- Redundant for IE. Tested and IE really seems to need it, jQuery has failed me!
        zCellBG_Frame[0].style.top              = aContentPos.top  + 'px';
        zCellBG_Frame[0].style.left             = aContentPos.left + 'px';

        zCellBG_Frame.offset (aContentPos);

	} );

}

// Initialize
ui.init();


// Load
$(document).ready(function(){
		
	// Render the calendar
	ui.renderCalendar();
	
	/*ui.renderTime();*/
	
	$(window).resize (function() {ajustarColores();});
	
	$('.nuevaReserva .close').click(function(){
		$('.nuevaReserva').animate({
			opacity:0
		}, 500, 'swing')
		.css({
			display: 'none'
		});
	})

});
