/*
	Bubble Tooltip code. From Jquery 4 Designers. @rem.
*/
function bubbleInit() {
	$('.bubbleInfo').each(function () {
		var distance = 10;
		var time = 250;
		var hideDelay = 10;

		var hideDelayTimer = null;

		var beingShown = false;
		var shown = false;
		var trigger = $('.trigger', this);
		var info = $('.popup').css('opacity', 0);


		$([trigger.get(0), info.get(0)]).mouseenter(function (e) {
			if (hideDelayTimer) clearTimeout(hideDelayTimer);
			if (beingShown || shown) {
				// don't trigger the animation again
				return;
			} else {
				// reset position of info box
				beingShown = true;
				
				// posicion del elemento seleccionado
				var target_offset = $(this).offset();
				
				// informacion de persona y motivo de los dos periodos
				var man = {persona: $(this).data("manpers") ,motivo: $(this).data("manmsg")};
				var tar = {persona: $(this).data("tarpers") ,motivo: $(this).data("tarmsg")};
				
				$('.popup')
					.empty()
					.append('<h1>Mañana: </h1>')
					.append('<p><strong>Persona: </strong> ' + man.persona + '</p><p><strong>Motivo: </strong> ' + man.motivo + '</p>')
					.append('<h1>Tarde: </h1>')
					.append('<p><strong>Persona: </strong> ' + tar.persona + '</p><p><strong>Motivo: </strong> ' + tar.motivo + '</p>');
				
				info.css({
					top: (target_offset.top - 20) + "px",
					left: target_offset.left + "px",
					display: 'block',
					background: 'white'
				}).animate({
					top: '-=' + distance + 'px',
					opacity: 1
				}, time, 'swing', function() {
					beingShown = false;
					shown = true;
				});
			}

			return false;
		}).mouseleave(function () {
			if (hideDelayTimer) clearTimeout(hideDelayTimer);
			hideDelayTimer = setTimeout(function () {
				hideDelayTimer = null;
				info.animate({
					top: '-=' + distance + 'px',
					opacity: 0
				}, time, 'swing', function () {
					shown = false;
					info.css('display', 'none');
				});

			}, hideDelay);

			return false;
		});
	});
};
