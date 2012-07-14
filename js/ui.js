

var ui = {

	// Render the Calendar
	"renderCalendar" : function(mm,yy){
		
		// HTML renderers
		var _html = "";
		var cls = "";
		var msg = "";
		var id = "";
		
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
		var evnt = function(){return {"event" : [
			 {"date":"12/25","title":"Christmas","periodo":"Tarde"}
			,{"date":"1/01","title":"New Year's Day","periodo":"Mañana"}
			,{"date":"11/22","title":"Thanksgiving"}
			,{"date":"9/03","title":"Labor Day"}
			,{"date":"7/04","title":"Independence Day"}
			,{"date":"5/28","title":"Memorial Day"}
			,{"date":"2/28","title":"President's Day"}
		]};}();
	
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
				msg = "";
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
				
				
				// Check Event schedule										//Aquí deberá marcar el día como ocupado, según el atributo periodo: "Tarde" o "Mañana"
				$.each(evnt.event,function(){	
					if(this.date == mon.getMonth()+1 + "/" + dow.substr(-2)){
						if(this.periodo == "Tarde"){
							//Marcar tarde
						}else if (this.periodo == "Mañana"){
							//Marcar mañana
						}
						cls = "holiday";
						msg = this.title;
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
				}else if(msg.length > 0){
					var auxiliar = new Date(mon);
					_html += '<td onclick="javascript:reservar(' + auxiliar.setDate(dow.substr(-2)) + ');" class="' +cls+ '" id="'+id+'">' + dow.substr(-2) + '<br/><span class="content">'+msg+'</span></td>';
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
		
		
	},
	
	
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
	},
	
	
	// Initialization
	"init" : function(){
	}
	
};

function reservar(dia){
	if(logged)
	{
		aux = new Date(dia);
		alert("vas a reservar para el día " + aux.getDate() + "/" + (aux.getMonth()+1) + "/" + aux.getFullYear() );
	}
}

// Initialize
ui.init();


// Load
$(document).ready(function(){
		
	// Render the calendar
	ui.renderCalendar();
	
	ui.renderTime();
	
});
