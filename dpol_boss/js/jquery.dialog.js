;(function($){

	function F(target, option){
	    this.opts = $.extend({
	    	overlay: {
		        backgroundColor: '#000',
				opacity: 0.6,
				zIndex: 50,
				debugs: false // 是否支持debug
		    }
		    , center: true // 是否居中显示
	        , callback: null
	    }, option);  
	    this.$target = $(target);
	    this.overlay = $('body').overlay(this.opts.overlay);
	    this.isIE6 = $.browser.msie && parseFloat($.browser.version) < 7;
	    this.init();
	}
	
	F.prototype = {
	    init: function(){
	        // this.show();
	        this.bindClose();
	    }
	    , show: function(){
			var t = this;
			
			t.overlay && t.overlay.add();

			if( !t.isIE6 ){
				t.$target.css({
					marginTop: -t.$target.outerHeight()/2 + 'px'
					, top: '50%'
				});
			}else{
				t.$target.css({
					top: ($(window).height() - t.$target.height())/2 + $(window).scrollTop()
					, marginTop: 0
				});
				$(window).scroll( function() { 
					t.$target.css({
						top: ($(window).height() - t.$target.height())/2 + $(window).scrollTop()
					});
				});
			}
			t.$target.css({ 				
					opacity: 1
					, left: '50%'
					, marginLeft: -t.$target.outerWidth()/2 + 'px'
					, zIndex: '9999'
				})
				.animate({					
					show: 'show'
				});			
		}
		, hide: function(){
			var t = this
				, callback = t.opts.callback;

			t.$target.animate({
				show: 'hide'
			}, function(){
				t.overlay && t.overlay.hide();
				if( callback && typeof callback === 'function' ){
					callback();
				}
			});
		}
		, bindClose: function(){
			var t = this;
			$('.close, .cancel', t.$target).bind( 'click', function(){
				t.hide();
				return false;
			});
		}
	    // debug
	    , debug: function(){
	        this.debugs && window.console && console.log && console.log( '[dialog] ' + Array.prototype.join.call(arguments, '') );
	    }
	}
	
	$.fn.dialog = function(o) {	
	    var instance;
	    this.each(function() {  
	    	instance = $.data( this, 'dialog' );
	    	// instance = $(this).data( 'dialog' );			            
	        if ( instance ) {
	            // return instance;         
	        }
	        else {
	            instance = $.data( this, 'dialog', new F(this, o) );          
	        }
	    });
	    return instance;
	}

})(jQuery);
