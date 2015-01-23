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
			start = Date.now() - totalMillis;
			lapStart = Date.now() - lapMillis;
			
			document.getElementById('start').className = 'hidden';
			document.getElementById('stop').className = '';
			document.getElementById('lap').className = '';
			document.getElementById('reset').className = 'hidden';
			document.getElementById('lap').disabled = false;
		
			timeInterval = setInterval( function() {
				var tick = Date.now();
				totalMillis = tick - start;
				lapMillis = tick - lapStart;
				
				var debugValues = {};
				debugValues['start'] = "start: " + start;
				debugValues['lapStart'] = "lapStart: " + lapStart;
				debugValues['totalMillis'] = "totalMillis: " + totalMillis;
				debugValues['lapMillis'] = "lapMillis: " + lapMillis;
				
				// APP.debugger.debug(debugValues);
				
				var currentHours = APP.formatter.hours(totalMillis / 10);
				var currentMinutes = APP.formatter.minutes(totalMillis / 10);
				var currentSeconds = APP.formatter.seconds(totalMillis / 10);
				var currentMillis = APP.formatter.millis(totalMillis / 10);
				
				var currentLapHours = APP.formatter.hours(lapMillis / 10);
				var currentLapMinutes = APP.formatter.minutes(lapMillis / 10);
				var currentLapSeconds = APP.formatter.seconds(lapMillis / 10);
				var currentLapMillis = APP.formatter.millis(lapMillis / 10);
				
				if (currentHours > 0)
				{
					var currentTime = currentHours + ":" + currentMinutes + ":" + currentSeconds;

				}
				else
				{
					var currentTime = currentMinutes + ":" + currentSeconds + "." + currentMillis;

				}
				
				if (currentLapHours > 0)
				{
					var lapTime = currentLapHours + ":" + currentLapMinutes + ":" + currentLapSeconds;

				}
				else
				{
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
		
			var currentLapHours = APP.formatter.hours(lapMillis / 10);
			var currentLapMinutes = APP.formatter.minutes(lapMillis / 10);
			var currentLapSeconds = APP.formatter.seconds(lapMillis / 10);
			var currentLapMillis = APP.formatter.millis(lapMillis / 10);
			
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

APP.debugger = (function() {
	
	return {
		debug: function(values) {
			document.getElementById('debugStart').innerText = values['start'];
			document.getElementById('debugLapStart').innerText = values['lapStart'];
			document.getElementById('debugTotalMillis').innerText = values['totalMillis'];
			document.getElementById('debugLapMillis').innerText = values['lapMillis'];
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
