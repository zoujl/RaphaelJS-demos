;(function($){
    function F(target, option){
        this.opts = $.extend({
            width: 975
            , height: 270
            , path: [
                'M0,0L190,0L126,270L0,270L0,0Z'
                , 'M194,0L318,0L336,270L131,270L194,0Z'
                , 'M322,0L500,0L470,270L340,270L322,0Z'
                , 'M506,0L638,0L674,270L475,270L506,0Z'
                , 'M643,0L840,0L786,270L678,270L643,0Z'
                , 'M845,0L975,0L975,270L790,270L845,0Z'
            ]
            , tipsElem: '#activate'
            , tips: []
            , tipsW: 1002
            , tipsH: 331
            , tipsTxtEl: '#tipsTxt'
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
                    self.debug( '弹弹窗' );
                });

                units.push( ra ); 
            }

            // Tips
            for(var i=0; i<tipsLen; i++){

                // var rt = RT.image( tips[i].img, tips[i].l, tips[i].t, tips[i].w, tips[i].h ).attr( stl2 ).data('idx', i);
                var rt = RT.image( tips[i].img, tips[i].left, tips[i].top, tips[i].width, tips[i].height )
                            .attr( stl2 )
                            .data('idx', i)                            
                            .data('txt', tips[i].txt);

                unitsTips.push( rt ); 

            }

            if( $(opts.tipsTxtEl).length ){
                $(opts.tipsTxtEl).text( unitsTips[0].data('txt') )
            }

            this.units = units; 
            this.unitsTips = unitsTips; 
        }
        , mouseover: function( el ){

            var self = this
                , idx = el.data('idx')
                , tipsEl = self.unitsTips[idx]
                , tips = self.opts.tips
                ;

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
                , tipsEl = self.unitsTips[idx]
                , tips = self.opts.tips
                ;
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