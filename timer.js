var APP = {};

APP.timer = (function() {
	var timeInterval = undefined,
		totalMillis = 0,
		lapMillis = 0,
		lapStart = 0,
		laps = [];
	
	return {
		start: function() {
			lapStart = totalMillis;
		
			document.getElementById('start').disabled = true;
			document.getElementById('stop').disabled = false;
			document.getElementById('lap').disabled = false;
			document.getElementById('reset').disabled = true;
		
			timeInterval = setInterval( function() {
				totalMillis += 1;
				lapMillis += 1;
				
				var currentHours = APP.formatter.hours(totalMillis);
				document.getElementById('totalHours').innerText = currentHours;

				var currentMinutes = APP.formatter.minutes(totalMillis);
				document.getElementById('totalMinutes').innerText = currentMinutes;

				var currentSeconds = APP.formatter.seconds(totalMillis);
				document.getElementById('totalSeconds').innerText = currentSeconds;

				var currentMillis = APP.formatter.millis(totalMillis);
				document.getElementById('totalMillis').innerText = currentMillis;

				var currentLapHours = APP.formatter.hours(lapMillis);
				document.getElementById('lapHours').innerText = currentLapHours;
			
				var currentLapMinutes = APP.formatter.minutes(lapMillis);
				document.getElementById('lapMinutes').innerText = currentLapMinutes;
			
				var currentLapSeconds = APP.formatter.seconds(lapMillis);
				document.getElementById('lapSeconds').innerText = currentLapSeconds;
			
				var currentLapMillis = APP.formatter.millis(lapMillis);
				document.getElementById('lapMillis').innerText = currentLapMillis;
			}, 10);
		},
	
		stop: function() {
			document.getElementById('start').disabled = false;
			document.getElementById('lap').disabled = true;
			document.getElementById('stop').disabled = true;
			document.getElementById('reset').disabled = false;
		
			clearInterval(timeInterval);
		},
	
		lap: function() {
			var lapInMillis = totalMillis - lapStart;
		
			laps.push(lapInMillis);
			lapStart = totalMillis;
			lapTenths = 0;
			
			console.log(lapTenths);
		
			var lapHours = APP.formatter.hours(lapInMillis);
			var lapMinutes = APP.formatter.minutes(lapInMillis);
			var lapSeconds = APP.formatter.seconds(lapInMillis);
			var lapTenths = APP.formatter.millis(lapInMillis);
		
			var lapTime = lapHours + ":" + lapMinutes + ":" + lapSeconds + "." + lapTenths;
			var currentLaps = document.getElementById('laps').innerHTML;
				
			document.getElementById('laps').innerHTML = currentLaps + '\n<li>' + lapTime + '</li>';
		},
	
		reset: function() {
			clearInterval(timeInterval);
			
			totalMillis = 0;
			lapMillis = 0;
			document.getElementById('totalHours').innerText = '00';
			document.getElementById('totalMinutes').innerText = '00';
			document.getElementById('totalSeconds').innerText = '00';
			document.getElementById('totalMillis').innerText = '00';

			document.getElementById('lapHours').innerText = '00';
			document.getElementById('lapMinutes').innerText = '00';
			document.getElementById('lapSeconds').innerText = '00';
			document.getElementById('lapMillis').innerText = '00';
		
			document.getElementById('laps').innerHTML = '';
		}
	};
})();

APP.formatter = (function() {
	
	pad = function(num) {
		return num < 10 ? "0" + num : num;
	}
	
	return {
		hours: function(millis) {
			return pad(Math.floor(millis / (60 * 60 * 100)) % 24);
		},
	
		minutes: function(millis) {
			return pad(Math.floor(millis / (60 * 100)) % 60);
		},
	
		seconds: function(millis) {
			return pad(Math.floor(millis / 100) % 60);
		},
	
		millis: function(millis) {
			return pad(millis % 100);
		}
	};
})();

document.getElementById('start').disabled = false;
document.getElementById('stop').disabled = true;
document.getElementById('lap').disabled = true;
document.getElementById('reset').disabled = false;

document.getElementById('start').onclick = function () {
	APP.timer.start();
};

document.getElementById('stop').onclick = function () {
	APP.timer.stop();
};

document.getElementById('lap').onclick = function () {
	APP.timer.lap();
};

document.getElementById('reset').onclick = function () {
	APP.timer.reset();
};
