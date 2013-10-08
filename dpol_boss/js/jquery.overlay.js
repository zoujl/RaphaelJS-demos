;(function($){

	function F(target, option){
	    this.opts = $.extend({
	        backgroundColor: '#000',
			opacity: 0.6,
			zIndex: 50,
			debugs: false // 是否支持debug
	    }, option);  

	    this.$target = $(target);
	    this.isIE6 = $.browser.msie && parseFloat($.browser.version) < 7;
	    this.doc_h = $(document).height();
	    this.visible = false;
	    this.debugs = this.opts.debugs;
	    // this.style = {};
	    // this.init();
	}
	
	F.prototype = {
	    init: function(){
			this.add();
	    }
	    //	Default CSS		
	    , defCss: function(){

	    	var t = this,
	    		opts = this.opts

			return {
				position       : t.isIE6 ? 'absolute' : 'fixed',
				zIndex         : opts.zIndex,
				top            : '0px',
				left           : '0px',
				height         : t.isIE6 ? t.doc_h : '100%',
				width          : '100%',
				backgroundColor: opts.backgroundColor,
				filter         : 'alpha(opacity=' + opts.opacity*100 + ')',
				opacity        : opts.opacity	
			}
		}	
	    // add overlay
	    , add: function( sty ){

	    	var t = this;

	    	if( this.$overlay ){
	    		if( !this.visible ){
	    			this.show();
	    		}
	    		this.debug( 'has been added' );
	    		return;
	    	}

			/*this.$overlay = $('<div>', {
				id: 'Overlay'
				, class: 'OverlayBG'
				, css: sty || this.defCss()
			});*/
			this.$overlay = $('<div>', { 
				css: sty || this.defCss()
			});
			
			this.$target.append( this.$overlay );
			this.visible = true;

			this.debug( 'ok, added!', this.$overlay);
		}
		//	remove overlay
		, remove: function(){	
			
			var t = this,
				$overlay = this.$overlay;

			if( $overlay ) {
				$overlay.fadeOut(function(){
					$overlay.remove();
					t.$overlay = null;
					t.debug( 'ok, removed!', t.$overlay);
				});
			}else{
				this.debug( 'There is no overlay' );
			}

		}		
		//	hide overlay
		, hide: function(){

			var $overlay = this.$overlay;	

			if( !$overlay ) {
				this.debug( 'There is no overlay' );							
			}else if( this.visible ){
				$overlay.fadeOut();
				this.visible = false;
				this.debug( 'ok, hidden!', this.$overlay);
			}else{
				this.debug( 'The overlay is hidden' );
			}
		}		
		//	show overlay
		, show: function(){

			var $overlay = this.$overlay;	
			
			if( !$overlay ) {
				this.debug( 'There is no overlay' );
				this.add();							
			}else if( this.visible ){
				this.debug( 'The overlay is visible' );
			}else{
				$overlay.fadeIn();	
				this.visible = true;
				this.debug( 'ok, visible!', this.$overlay);
			}
		}	
		/*
		** update overlay
		** o - css config
		 */
		, update: function( o ){
			
			var $overlay = this.$overlay
				, sty = $.extend( this.defCss(), o);

			if( $overlay ) {
				$overlay.css( sty );
			}else{
				this.add( sty );
			}
		}
		// debug
		, debug: function(){
			this.debugs && window.console && console.log && console.log( '[overlay] ' + Array.prototype.join.call(arguments, ' ') );
		}
	}
	
	$.fn.overlay = function(o) {    
	    var instance;
	    this.each(function() {	
	    	instance = $.data( this, 'overlay' );
	    	// instance = $(this).data( 'overlay' );			
			if ( instance ) {
				//instance.init();			
			} else {
				instance = $.data( this, 'overlay', new F(this, o) );			
			}
		});
		return instance;
	}

})(jQuery);
