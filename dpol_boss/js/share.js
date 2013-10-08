$(function(){
    
    var share = new Cyoushare('target', {
        offset: ['0', '0']
        , icon: 'small' // 使用小图标
        , notShareTo: 's_qzone, s_renren, s_kaixin, s_tieba'
        , gap: '5px' // 图标间隔5px
        , title: '斗破历程，在此启航，让我们一起跟随斗破的脚步共同成长！'
        , url: '' // 分享的地址
        , content: '这里汇聚了众多强悍的BOSS，邪恶小医仙、穆兰三老、云山…这些耳熟能详的名字都将成为你晋阶路上的考验，你准备好面对他们了么？'
        , pic: 'http://i0.cy.com/dpol/main/20121228/logo.png'
        , showTitle: 'false'
        , monitor: null
    });
    
});