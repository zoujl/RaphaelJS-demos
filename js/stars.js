/**
 * Author: ZouJL
 */

var conf = {
	// width
	width: 1600,
	// height
	height: 750,
	// fill - color
	colors: ['#ff0', '#9fee00', '#099', '#ff7400', '#cd0074'], 
	// highlight color
	highlight: '#ff4040',
	// stroke
	stroke: '#666',
	// radius - 半径范围
	radius: {
		min: 1,
		max: 5
	},
	// tips offset
	tips: {
		width: 300,
		height: 80,
		gap: 10 //  箭头的radius
	},
	// timeout
	timeout: 3000,
	// The number of stars
	num: 400
};


/**
 * Starry Object
 * @param  {String} target 指定id
 * @param  {object} conf   配置
 * @return {function}   this.init()     
 */
var Starry = window.Starry || function( target, conf ){

	var conf = conf || {};

	this.opts = {
		// width
		width: conf.width || 1600,
		// height
		height: conf.height || 750,
		// fill - color
		colors: conf.colors || ['#ff0', '#9fee00', '#099', '#ff7400', '#cd0074'], 
		// highlight color
		highlight: conf.highlight || '#ff4040',
		// stroke
		stroke: '#666',
		// radius - 半径范围
		radius: conf.radius || {
			min: 1,
			max: 5
		},
		// tips offset
		tips: conf.tips || {
			width: 300,
			height: 80,
			gap: 10 // 箭头的radius
		},
		// timeout
		timeout: conf.timeout || 3000,
		// The number of stars
		num: conf.num || 1000
	}

	// this.R = Raphael('paper', 500, 400);

	// svg elements
	this.units = [];

	// svg tip elements
	this.tipsUnits = [];

	// target
	this.target = target; 

	// timer
	this.timer = null; 

	// init
	this.init();

}

Starry.prototype = {
		
	init: function(){

		var self = this;

		self.stars();        

	}
	, stars: function(){

		var self = this,
			opts = self.opts,
			len = opts.num,
			timeout = opts.timeout,
			R = Raphael( self.target, self.width, self.height),
			units = R.set();

		self.R = R;

		for( var i=0; i<len; i++ ){

			var P = self.property(),
				rc = R.circle( P.cx, P.cy, P.rd ).attr( P.ar ).data('idx', i),
				attrs = rc.attrs;

			rc.data('attrs', attrs)
				.hover( function(){

					self.mouseover( this );				

				}, function(){

					self.mouseout( this );				

				});

			units.push( rc );       
		}

		this.units = units;	

		// No support in IE
		/*R.forEach(function( el ){
			// ...
		});*/

		// auto play
		if( timeout ){

			self.slide( units[0] ); // slide the first one
			
			self.play();
		}  

	}
	, property: function(){

		var self = this,
			opts = self.opts,
			gap = opts.tips.gap * 2,
			colors = opts.colors,
			radius = opts.radius;

		return {

			cx: gap + Math.random() * ( opts.width - 2 * gap ),
			
			cy: gap + Math.random() * ( opts.height - 2 * gap ),

			//rd: 5,
			rd: radius.min + Math.random() * ( radius.max - radius.min ),            

			ar: {
				'fill': colors[ Math.floor( Math.random() * colors.length ) ], 
				// 'stroke': opts.stroke,
				'stroke-width': 0,
				// 'filter': 'url(#Gaussian_Blur)', 
				'fill-opacity': .7
			}

		}

	}
	/*
	 * @param 
	 * x: x coordinate
	 * y: y coordinate
	 * c: fill color
	 * t: tips text
	 */
	, createTips: function( x, y, c, t){

		var self = this,
			r = self.R,
			o = self.opts,
			ctx = Math.round( o.width/2 ),
			cty = Math.round( o.height/2 ),
			tips = o.tips,
			w = tips.width,
			h = tips.height,
			g = tips.gap,
			tx = 0, // text x
			ty = 0, // text y
			path = '';

		if( x <= ctx && y <= cty ){

			var x1 = x+g, y1 = y+g,
				x2 = x1+w-3*g, y2 = y1,
				x3 = x2, y3 = y2+h,
				x4 = x3-w, y4 = y3,
				x5 = x4, y5 = y4-h,
				x6 = x5+g, y6 = y5;

			tx = x+w/2-2*g; ty = y+h/2+g;	

		}else if( x > ctx && y <= cty ){

			var x1 = x+g, y1 = y+g,
				x2 = x1+g, y2 = y1,
				x3 = x2, y3 = y2+h,
				x4 = x3-w, y4 = y3,
				x5 = x4, y5 = y4-h,
				x6 = x5+w-3*g, y6 = y5;
				
			tx = x-w/2+2*g; ty = y+h/2+g;	

		}else if( x > ctx && y > cty ){

			var x1 = x-g, y1 = y-g,
				x2 = x1-w+3*g, y2 = y1,
				x3 = x2, y3 = y2-h,
				x4 = x3+w, y4 = y3,
				x5 = x4, y5 = y4+h,
				x6 = x5-g, y6 = y5;
				
			tx = x-w/2+2*g; ty = y-h/2-g;	

		}else{

			var x1 = x-g, y1 = y-g,
				x2 = x1-g, y2 = y1,
				x3 = x2, y3 = y2-h,
				x4 = x3+w, y4 = y3,
				x5 = x4, y5 = y4+h,
				x6 = x5-w+3*g, y6 = y5;
				
			tx = x+w/2-2*g; ty = y-h/2-g;	

		}
		
		path = 'M'+x+','+y+'L'+x1+','+y1+'L'+x2+','+y2+'L'+x3+','+y3+'L'+x4+','+y4+'L'+x5+','+y5+'L'+x6+','+y6+'Z';

		var ar_p = {
				'fill': '#000',
				'stroke': c,
				'stroke-width': 1,
				'fill-opacity': 0
			},
			ar_t = {
				'fill': c,
				//'stroke': '#666',
				//'stroke-width': 2,
				'fill-opacity': 0,
	            //'transform': 'r-10',
	            'font': 'normal 12px Georgia'
			},
			rp = r.path( path ).attr( ar_p );
			rt = r.text( tx, ty, t ).attr( ar_t );
		

		self.tipsUnits.push( rp );
		self.tipsUnits.push( rt );

		rp.animate({
			'stroke-width': 2,
			'fill-opacity': .7
		}, 450).hover(function(){

			self.hovered = true;
			self.stop();

		}, function(){

			self.hovered = false;

			setTimeout( function(){

				if( !self.hovered ) self.play();

			}, 50 );


		});

		rt.animate({
			'fill-opacity': .7
		}, 450).hover(function(){

			self.hovered = true;
			self.stop();

		}, function(){

			self.hovered = false;
			
			setTimeout( function(){

				if( !self.hovered ) self.play();

			}, 50 );

		});

	}
	, removeTips: function(){

		var self = this,
			tips = self.tipsUnits;

		if( !tips.length ) return

		for( var i=0, len=tips.length; i<len; i++ ){

			tips[i].remove();
			
			/*var el = tips[i];

			el.animate({
				'stroke-width': 0,
				'fill-opacity': 0
			}, 450, '<', function(){
				el.remove();
			});*/	
		}

		self.tipsUnits = [];

	}
	/*
	 * @param
	 * el: element
	 * cl: fill color
	 * cr: element radius
	 */
	, highlight: function( el, cl, cr ){

		el.animate({
			'fill-opacity': 1,
			'stroke': cl,
			'stroke-width': Math.round(8-cr) // make the element has 8px layout
		}, 450);

	}
	, unhighlight: function( el ){

		//var cl = this.opts.stroke;
		el.animate({
			'fill-opacity': .7,
			// 'stroke': cl,
			'stroke-width': 0
		}, 450);

	}
	, mouseover: function( el ){

		var self = this;

		if( !el.data('tips') ){

			self.slide( el );
			
			el.data('tips', true);		
		}

		self.stop();		

	}
	, mouseout: function( el ){

		var self = this;

		el.data('tips', '');

		setTimeout( function(){

			if( !self.hovered ) self.play();

		}, 50 );

	}
	, slide: function( el ){

		var self = this,
			attrs = el.data('attrs'),
			cx = attrs.cx,
			cy = attrs.cy,
			cl = attrs.fill,
			cr = attrs.r;
	
		self.removeTips(); // remove all tips

		self.createTips( cx, cy, cl, '可缩放矢量图形（Scalable Vector Graphics，SVG\n是基于可扩展标记语言（XML）' ); // create new tips

		if( self.prevEl ){
			self.unhighlight( self.prevEl ); // remove highlight
		}

		self.highlight( el, cl, cr )
			
		self.prevEl = el; // set prev element

	}
	, play: function(){

		var self = this,
			idx = self.prevEl ? self.prevEl.data('idx') : -1,
			units = self.units;

		self.stop();

		self.timer = setInterval( function(){

			if( idx >= self.opts.num-1 ) idx = -1;

			var thisIdx = idx + 1;

			self.slide( self.units[thisIdx] );
			
			idx++;

		}, self.opts.timeout);
		
	}
	, stop: function(){

		clearInterval( this.timer );

	}

};  