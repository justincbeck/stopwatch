var APP = {};

APP.timer = (function() {
	var timeInterval = undefined,
		totalTenths = 0,
		lapStart = 0,
		laps = [];
	
	return {
		start: function() {
			lapStart = totalTenths;
		
			$('#start').prop('disabled', true);
			$('#lap').prop('disabled', false);
			$('#stop').prop('disabled', false);
			$('#reset').prop('disabled', true);
		
			timeInterval = setInterval( function() {
				totalTenths += 1;
				
				var hours = APP.formatter.hours(totalTenths);
				$('#hours').text(hours);
			
				var minutes = APP.formatter.minutes(totalTenths);
				$('#minutes').text(minutes);
			
				var seconds = APP.formatter.seconds(totalTenths);
				$('#seconds').text(seconds);
			
				var millis = APP.formatter.tenths(totalTenths);
				$('#millis').text(millis);
			}, 100);
		},
	
		stop: function() {
			$('#start').prop('disabled', false);
			$('#lap').prop('disabled', true);
			$('#stop').prop('disabled', true);
			$('#reset').prop('disabled', false);
		
			clearInterval(timeInterval);
		},
	
		lap: function() {
			var lapInMillis = totalTenths - lapStart;
		
			laps.push(lapInMillis);
			lapStart = totalTenths;
		
			var lapHours = APP.formatter.hours(lapInMillis);
			var lapMinutes = APP.formatter.minutes(lapInMillis);
			var lapSeconds = APP.formatter.seconds(lapInMillis);
			var lapTenths = APP.formatter.tenths(lapInMillis);
		
			var lapTime = lapHours + ":" + lapMinutes + ":" + lapSeconds + "." + lapTenths;
				
			$('#laps').append('<li>' + lapTime + '</li>');
		},
	
		reset: function() {
			clearInterval(timeInterval);
			totalTenths = 0;
			$('#hours').text('00');
			$('#minutes').text('00');
			$('#seconds').text('00');
			$('#millis').text('0');
		
			$('#laps').empty();
		}
	};
})();

APP.formatter = (function() {
	
	pad = function(num) {
		return num < 10 ? "0" + num : num;
	}
	
	return {
		hours: function(totalTenths) {
			return pad(Math.floor(totalTenths / (60 * 60 * 10)) % 24);
		},
	
		minutes: function(totalTenths) {
			return pad(Math.floor(totalTenths / (60 * 10)) % 60);
		},
	
		seconds: function(totalTenths) {
			return pad(Math.floor(totalTenths / 10) % 60);
		},
	
		tenths: function(totalTenths) {
			return totalTenths % 10;
		}
	};
})();

$(document).ready(function() {
	$('#start').prop('disabled', false);
	$('#stop').prop('disabled', true);
	$('#lap').prop('disabled', true);
	$('#reset').prop('disabled', true);
	
	$('#start').click( function () {
		APP.timer.start();
	});
	
	$('#stop').click( function () {
		APP.timer.stop();
	});
	
	$('#lap').click( function () {
		APP.timer.lap();
	});
	
	$('#reset').click( function () {
		APP.timer.reset();
	});
});