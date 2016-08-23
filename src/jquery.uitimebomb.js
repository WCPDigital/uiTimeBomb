/*!
 * uiTimeBomb v1.0.0
 *
 * @author Patrick Purcell
 * @copyright Copyright (c) 2016 WCP Digital
 * @license http://opensource.org/licenses/MIT
 * @link http://www.wcpdigital.com.au
 * @link http://patrickpurcell.bio
 *
 * Date: 2016-08-23
 */
(function( $ ){
	"use strict";
		
	function uiTimeBomb( args )
	{
		var self = this
		,version = "1.0.0"
		,settings = {
			elements:[]
			,date:new Date()
			,padNumbers:false
			,mode:"years"
			,format:"{y} years, {m} months, {d} days, {h} hours, {i} minutes, {s} seconds"
			,localTime:true
			,onStart:null
			,onUpdate:null
			,onComplete:null
		}
		,timer = null
		,deltaSecs = 0
		
		,pad = function( n ) 
		{
			return (n < 10 ? '0' : '') + n;
		}
		
		,supplant = function( str, vals ) {
			return str.replace(/{([^{}]*)}/g,
				function (a, b) {
					var r = vals[b];
					return typeof r === 'string' || typeof r === 'number' ? r : a;
				}
			);
		}

		,setElement = function( el )
		{
			settings.element = el;
			return self;
		}
		
		,getElement = function()
		{
			return settings.element;
		}
		
		,setDate = function( dt )
		{
			settings.date = dt;
			return self;
		}
		
		,getDate = function()
		{
			return settings.date;
		}
		
		,get = function( method )
		{
			var y = 0
				,m = 0
				,d = 0
				,h = 0
				,i = 0
				,s = 0
				,counter = deltaSecs;
				
			switch( String(method).toLowerCase() )
			{	
				default:
				case "years":
					y = Math.floor( counter/31536000 );
					counter -= (y*31536000);
					
				case "months":
					m = Math.floor( counter/2592000 );
					counter -= (m*2592000);
					
				case "days":
					d = Math.floor( counter/86400 );
					counter -= (d*86400);
					
				case "hours":
					h = Math.floor( counter/3600 );
					counter -= (h*3600);
					
				case "minutes":
					i = Math.floor( counter/60 );
					counter -= (i*60);
					
				case "seconds":
					s = Math.floor( counter );
					break;
			}
			return {
				y:y
				,m:m
				,d:d
				,h:h
				,i:i
				,s:s
			};
		}
		
		,start = function()
		{
			return settings.onStart && settings.onStart( self );
		}
		,updateElements = function()
		{
			if( settings.elements ){
				var data = get(settings.mode);
				var str = supplant(settings.format,data);
				for( var i=0, el=null, len=settings.elements.length; i<len; i++ ){
					el = settings.elements[i];
					if( el.innerHTML !== undefined ){
						el.innerHTML = str;
					}
				}
			}
		}
		,update = function()
		{
			var offset = settings.localTime 
				? (settings.date.getTimezoneOffset() * 60)
				: 0;

			var fromMS = settings.date.getTime();
			var nowMS = new Date().getTime();
			deltaSecs = ((fromMS-nowMS) * 0.001) + offset;

			if( deltaSecs <= 0 ){
				deltaSecs = 0;
				updateElements();
				settings.onUpdate && settings.onUpdate( self );
				clearInterval( timer );
				
				return complete();
			}
			updateElements();
			
			return settings.onUpdate && settings.onUpdate( self );
		}
		
		,complete = function()
		{
			return settings.onComplete && settings.onComplete( self );
		}
		
		,init = function( options )
		{		
			// Public Methods
			self.get = get;
			self.setDate = setDate;
			self.getDate = getDate;
			self.supplant = supplant;
			
			if( options ){
				settings = $.extend( {}, settings, options );
				if( !$.isArray( settings.elements ) ){
					settings.elements = [settings.elements];
				}
			}

			start();
			
			timer = setInterval(function(){
				update();
			},1000);
			
			update();
		};
		init( args );
	};
	
	$.uiTimeBomb = function( args )
	{
		return new uiTimeBomb( args );
	}
	
    $.fn.uiTimeBomb = function( args )
	{
		return args = args||{}
			,args.elements = $(this).toArray() || []
			,new uiTimeBomb( args );
	}
	
}( jQuery ));
