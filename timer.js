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
				var currentMinutes = APP.formatter.minutes(totalMillis);
				var currentSeconds = APP.formatter.seconds(totalMillis);
				var currentMillis = APP.formatter.millis(totalMillis);

				document.getElementById('totalHours').innerText = currentHours;
				document.getElementById('totalMinutes').innerText = currentMinutes;
				document.getElementById('totalSeconds').innerText = currentSeconds;
				document.getElementById('totalMillis').innerText = currentMillis;

				var currentLapHours = APP.formatter.hours(lapMillis);
				var currentLapMinutes = APP.formatter.minutes(lapMillis);
				var currentLapSeconds = APP.formatter.seconds(lapMillis);
				var currentLapMillis = APP.formatter.millis(lapMillis);

				document.getElementById('lapHours').innerText = currentLapHours;
				document.getElementById('lapMinutes').innerText = currentLapMinutes;
				document.getElementById('lapSeconds').innerText = currentLapSeconds;
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
			var currentLapInMillis = totalMillis - lapStart;
		
			laps.push(currentLapInMillis);
			lapStart = totalMillis;
			lapMillis = 0;
			
			console.log(lapMillis);
		
			var currentLapHours = APP.formatter.hours(currentLapInMillis);
			var currentLapMinutes = APP.formatter.minutes(currentLapInMillis);
			var currentLapSeconds = APP.formatter.seconds(currentLapInMillis);
			var currentLapMillis = APP.formatter.millis(currentLapInMillis);
		
			var lapTime = currentLapHours + ":" + currentLapMinutes + ":" + currentLapSeconds + "." + currentLapMillis;
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
