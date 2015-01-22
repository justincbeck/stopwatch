var APP = {};

APP.timer = (function() {
	var timeInterval = undefined,
		start = 0,
		lapStart = 0,
		totalMillis = 0,
		lapMillis = 0,
		laps = [];
	
	return {
		start: function() {
			start = Date.now();
			lapStart = Date.now();
			
			document.getElementById('start').className = 'hidden';
			document.getElementById('stop').className = '';
			document.getElementById('lap').className = '';
			document.getElementById('reset').className = 'hidden';
			document.getElementById('lap').disabled = false;
		
			timeInterval = setInterval( function() {
				var tick = Date.now();
				totalMillis = (tick - start) / 10;
				lapMillis = (tick - lapStart) / 10;
				
				var currentHours = APP.formatter.hours(totalMillis);
				var currentMinutes = APP.formatter.minutes(totalMillis);
				var currentSeconds = APP.formatter.seconds(totalMillis);
				var currentMillis = APP.formatter.millis(totalMillis);
				
				var currentLapHours = APP.formatter.hours(lapMillis);
				var currentLapMinutes = APP.formatter.minutes(lapMillis);
				var currentLapSeconds = APP.formatter.seconds(lapMillis);
				var currentLapMillis = APP.formatter.millis(lapMillis);
				
				if (currentHours > 0)
				{
					var currentTime = currentHours + ":" + currentMinutes + ":" + currentSeconds;
					var lapTime = currentLapHours + ":" + currentLapMinutes + ":" + currentLapSeconds;

				}
				else
				{
					var currentTime = currentMinutes + ":" + currentSeconds + "." + currentMillis;
					var lapTime = currentLapMinutes + ":" + currentLapSeconds + "." + currentLapMillis;

				}
				
				document.getElementById('mainDisplay').innerText = currentTime;
				document.getElementById('lapDisplay').innerText = lapTime;
				
			}, 10);
		},
	
		stop: function() {
			document.getElementById('start').className = '';
			document.getElementById('stop').className = 'hidden';
			document.getElementById('lap').className = 'hidden';
			document.getElementById('lap').disabled = true;
			document.getElementById('reset').className = '';
		
			clearInterval(timeInterval);
		},
	
		lap: function() {
			lapStart = Date.now();
		
			laps.push(lapMillis);
			
			console.log(lapMillis);
		
			var currentLapHours = APP.formatter.hours(lapMillis);
			var currentLapMinutes = APP.formatter.minutes(lapMillis);
			var currentLapSeconds = APP.formatter.seconds(lapMillis);
			var currentLapMillis = APP.formatter.millis(lapMillis);
			
			var lapCount = "<span id=\"lap-label\">Lap " + laps.length + "</span>";
			
			if (currentLapHours > 0)
			{
				var lapTime = "<span id=\"lap-time\">" + currentLapHours + ":" + currentLapMinutes + ":" + currentLapSeconds + "." + currentLapMillis + "</span>";
			}
			else
			{
				var lapTime = "<span id=\"lap-time\">" + currentLapMinutes + ":" + currentLapSeconds + "." + currentLapMillis + "</span>";
			}

			var currentLaps = document.getElementById('lap-list').innerHTML;
				
			document.getElementById('lap-list').innerHTML = '\n<li>' + lapCount + lapTime + '</li>' + currentLaps;
		},
	
		reset: function() {
			clearInterval(timeInterval);
			
			totalMillis = 0;
			lapMillis = 0;
			
			document.getElementById('mainDisplay').innerText = "00:00.00";
			document.getElementById('lapDisplay').innerText = "00:00.00";
			document.getElementById('lap-list').innerHTML = '';
			document.getElementById('lap').className = '';
			document.getElementById('lap').disabled = true;
			document.getElementById('reset').className = 'hidden';
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
			return pad(Math.floor(millis % 100));
		}
	};
})();

document.getElementById('stop').className = 'hidden';
document.getElementById('reset').className = 'hidden';
document.getElementById('lap').disabled = true;

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
