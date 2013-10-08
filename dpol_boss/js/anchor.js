;(function($){
    function F(target, option){
        this.opts = $.extend({
            width: 975
            , height: 270
            , path: [
                'M428,0L190,0L594,211L452,356L54,385L428,0Z'
                , 'M865,0L918,0L1298,287L496,340L865,0Z'
                , 'M945,0L1651,0L1299,287L945,0Z'
                , 'M454,373L725,713L140,825L454,373Z'
                , 'M1302,293L1630,540L780,702L1302,293Z'
                , 'M136,828L712,732L350,1056L202,1056L136,828Z'
                , 'M733,718L970,1056L390,1056L733,718Z'
                , 'M736,716L1618,556L1258,1056L990,1056L736,716Z'
            ]
            , tipsElem: '#activate'
            , tips: []
            , tipsW: 1652
            , tipsH: 1056
            , tipsTxtEl: '#txtTips'
            , debugs: true // 是否支持debug
        }, option);  
        // length of svg elements 
        this.len = this.opts.path.length;
        // svg elements
        this.units = [];
        // this.RA = Raphael('paper', 500, 400);
        // target
        this.target = target; 
        this.debugs = this.opts.debugs;
        // this.isIE6 = $.browser.msie && parseFloat($.browser.version) < 7;
        this.init();
    }

    F.prototype = {
        init: function(){
            this.anchor();
        }
        , anchor: function(){
            var self = this
                , opts = this.opts
                , len = this.len
                , tips = opts.tips
                , tipsLen = tips.length
                , paths = opts.path
                , RA = Raphael( this.target, opts.width, opts.height)
                , RT = Raphael( $(opts.tipsElem)[0], opts.tipsW, opts.tipsH)
                , units = RA.set() // 存放svg元素的数组
                , unitsTips = RT.set() // 存放svg元素（tips）的数组
                , stl = {
                    'fill'        : '#fff',
                    'stroke'      : '#000',
                    'stroke-width': 0,
                    'fill-opacity': 0,
                    'stroke-opacity': 0,
					'opacity': 0,
                    'cursor'      : 'pointer'
                }
                , stl2 = {
                    'opacity': 0
                }
                ;

            this.RA = RA;
            this.RT = RT;

            // 锚点
            for(var i=0; i<len; i++){

                var ra = RA.path( paths[i] ).attr( stl ).data('idx', i);

                ra.hover( function(){
                    
                    self.mouseover( this );

                }, function(){

                    self.mouseout( this );              

                }).click(function(){
                    self.onclick( this );
                });

                units.push( ra ); 
            }

            // Tips
            for(var i=0; i<tipsLen; i++){

                // var rt = RT.image( tips[i].img, tips[i].l, tips[i].t, tips[i].w, tips[i].h ).attr( stl2 ).data('idx', i);
                var rt = RT.image( tips[i].img, tips[i].left, tips[i].top, tips[i].width, tips[i].height )
                            .attr( stl2 )
                            .data('idx', i)
                            .data('txt', tips[i].txt)
                            .data('href', tips[i].href);

                unitsTips.push( rt ); 

            }

            /*if( $(opts.tipsTxtEl).length ){
                $(opts.tipsTxtEl).text( unitsTips[0].data('txt') )
            }*/

            this.units = units; 
            this.unitsTips = unitsTips; 
        }
        , mouseover: function( el ){

            var self = this
                , idx = el.data('idx')
                //, activeEl = $(self.target).data('activeEl')
                , tipsEl = self.unitsTips[idx]
                , tips = self.opts.tips
                ;

            /*if( $(activeEl).length ){
                $(activeEl).animate({
                    opacity
                });
            }  */    
            setTimeout( function(){

                tipsEl.animate({
                    opacity: 1
                    //, segment: [tips.left, tips.top, tips.width, tips.height]
                    //, cx: tips.left
                    //, cy: tips.top
                    //, width: tips.width
                    //, height: tips.height
                }, 450, '<>');

                if( $(self.opts.tipsTxtEl).length ){
                    $(self.opts.tipsTxtEl).text( tipsEl.data('txt') )
                }

            }, 100);

        }
        , mouseout: function( el ){

            var self = this
                , idx = el.data('idx')
                //, activeEl = $(self.target).data('activeEl')
                , tipsEl = self.unitsTips[idx]
                , tips = self.opts.tips
                ;

            /*if( $(activeEl).length ){
                $(activeEl).animate({
                    opacity
                });
            }  */    
            setTimeout( function(){

                tipsEl.animate({
                    opacity: 0
                    // , cx: tips.l
                    // , cy: tips.t
                    //, width: tips.w
                    //, height: tips.h
                }, 450, '<>');

            }, 100);

        }
        , onclick: function( el ){
        	var self = this
                , idx = el.data('idx')
                //, activeEl = $(self.target).data('activeEl')
                , tipsEl = self.unitsTips[idx]
                , href = tipsEl.data('href')
                ;
            if( href && href != '' ){
            	// window.open(href, 'href'+idx);
                window.location.href = href;
            }
        }
        // debug
        , debug: function(){
            this.debugs && window.console && console.log && console.log( '[anchor] ' + Array.prototype.join.call(arguments, ' ') );
        }
    }

    $.fn.anchor = function(o) {

        // var instance = $.data( this, 'anchor' );
        var instance = $(this).data( 'anchor' );

        this.each(function() {              
            if ( instance ) {
                // instance.init();         
            }
            else {
                instance = $.data( this, 'anchor', new F(this, o) );          
            }
        });
        return instance;
    }

})(jQuery);