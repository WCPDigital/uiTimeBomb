#uiTimeBomb jQuery &amp; Javascript Utility - A fast and flexible count-down timer.
================================

**A simple, small, flexible JavaScript count-down timer helper.**

See a demo [here](https://www.wcpdigital.com.au/git/uitimebomb/example/)

##How to use uiTimeBomb
```html
<head>
	...
</head>
<body>
	<div>
		<div id="timer"></div>
		<div id="timer2"></div>
		<div id="timer3"></div>
	</div>
</body>
```

```js
<script src="uitimebomb.min.js"></script>
<script>
"use strict";
var tb1 = new uiTimeBomb({
	elements:[
		document.getElementById("timer")
	]
	,date:new Date( Date.now()+(12E4) )
	,localTime:false
	,onStart:function(){
		console.log("Start");
	}
	,onComplete:function(){
		console.log("Complete");
	}
	,onUpdate:function(ui){
		var data = ui.get("minutes");
		var str = ui.supplant("{i}m, {s}s",data);
		var el = document.getElementById("timer");
		el.innerHTML = str;
	}
});

var tb1 = new uiTimeBomb({
	elements:document.getElementById("timer2")
	,date:new Date( Date.now()+(36E5*2) )
	,localTime:false
	,method:"hours"
	,format:"{h}h, {i}m, {s}s"
});

var tb1 = new uiTimeBomb({
	elements:document.getElementById("timer3")
	,date:new Date( Date.now()+(864E5*2) )
	,localTime:false
	,method:"days"
	,format:"{d} Days {h} Hours {i} Mins {s} Secs"
});
</script>
```

##Or using jQuery uiTimeBomb
```js
<script src="jquery.uitimebomb.min.js"></script>
<script>
"use strict";
jQuery(function($){
	$.uiTimeBomb({
		date:new Date( Date.now()+(12E4) )
		,localTime:false
		,onStart:function(){
			console.log("Start");
		}
		,onComplete:function(){
			console.log("Complete");
		}
		,onUpdate:function(ui){
			var data = ui.get("minutes");
			var str = ui.supplant("{i}m, {s}s",data);
			var el = document.getElementById("timer");
			el.innerHTML = str;
		}
	});
	
	$("#timer2").uiTimeBomb({
		date:new Date( Date.now()+(36E5*2) )
		,localTime:false
		,method:"hours"
		,format:"{h}h, {i}m, {s}s"
	});
	
	$("#timer3").uiTimeBomb({
		date:new Date( Date.now()+(864E5*2) )
		,localTime:false
		,method:"days"
		,format:"{d} Days {h} Hours {i} Mins {s} Secs"
	});
});
</script>
```


##License
Copyright &copy; [WCP Digital](http://www.wcpdigital.com.au) &amp; [Patrick Purcell](http://patrickpurcell.bio)<br>
Licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).
<br>**Commercial use?** Go for it! You can include it in your commercial products.
