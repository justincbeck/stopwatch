var APP = {};

APP.timer = {
	timeInterval: undefined,
	totalTenths: 0,
	lapStart: 0,
	laps: new Array(),
	
	start: function() {
		var that = this;
		that.lapStart = that.totalTenths;
		
		$('#start').prop('disabled', true);
		$('#lap').prop('disabled', false);
		$('#stop').prop('disabled', false);
		$('#reset').prop('disabled', true);
		
		this.timeInterval = setInterval( function() {
			that.totalTenths += 1;
			
			var hours = APP.formatter.hours(that.totalTenths);
			$('#hours').text(hours);
			
			var minutes = APP.formatter.minutes(that.totalTenths);
			$('#minutes').text(minutes);
			
			var seconds = APP.formatter.seconds(that.totalTenths);
			$('#seconds').text(seconds);
			
			var millis = APP.formatter.tenths(that.totalTenths);
			$('#millis').text(millis);
		}, 100);
	},
	
	stop: function() {
		$('#start').prop('disabled', false);
		$('#lap').prop('disabled', true);
		$('#stop').prop('disabled', true);
		$('#reset').prop('disabled', false);
		
		clearInterval(this.timeInterval);
	},
	
	lap: function() {
		var lapInMillis = this.totalTenths - this.lapStart;
		
		console.log(this.totalTenths);
		
		this.laps.push(lapInMillis);
		this.lapStart = this.totalTenths;
		
		var lapHours = APP.formatter.hours(lapInMillis);
		var lapMinutes = APP.formatter.minutes(lapInMillis);
		var lapSeconds = APP.formatter.seconds(lapInMillis);
		var lapTenths = APP.formatter.tenths(lapInMillis);
		
		var lapTime = lapHours + ":" + lapMinutes + ":" + lapSeconds + "." + lapTenths;
				
		$('#laps').append('<li>' + lapTime + '</li>');
	},
	
	reset: function() {
		clearInterval(this.timeInterval);
		this.totalTenths = 0;
		$('#hours').text('0');
		$('#minutes').text('0');
		$('#seconds').text('0');
		$('#millis').text('0');
		
		$('#laps').empty();
	}
}

APP.formatter = {
	hours: function(totalTenths) {
		return Math.floor(totalTenths / (60 * 60 * 10)) % 24;
	},
	
	minutes: function(totalTenths) {
		return Math.floor(totalTenths / (60 * 10)) % 60;
	},
	
	seconds: function(totalTenths) {
		return Math.floor(totalTenths / 10) % 60;
	},
	
	tenths: function(totalTenths) {
		return totalTenths % 10;
	}
}

$(document).ready(function() {
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