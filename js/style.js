/**
 * User: huyy
 * Date: 2015/11/9 0009
 * Time: 下午 5:17
 */
$(document).ready(function () {
    var topHieght = $('.classfiyhead').height();
    var screenHeight = $(window).height();
    var setHeght = parseFloat(screenHeight) - parseFloat(topHieght);
    $('.g-box').height(setHeght + 'px');
    $('.scrollwarpper').height(screenHeight + 'px');

    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
});

var swiper = new Swiper('.u-topshow', {
    loop: true, autoplay: 2000, pagination: '.swiper-pagination',
});

var swiper = new Swiper('.u-showpic', {
    loop: true,  pagination: '.swiper-pagination',
});

$('footer>ul>li').click(function () {
    $(this).find('i.fill').show();
    $(this).find('span').addClass('s-red');
    $(this).siblings('li').find('i.line').show();
    $(this).find('i.line').hide();
    $(this).siblings('li').find('span').removeClass('s-red');
    $(this).siblings('li').find('i.fill').hide();
});
/*类目效果*/
var signalH = $('.u-classify>ul>li').height();
var lastindex = $('.u-classify>ul>li:last-child').index();
var startPosition, endPosition;
$('.u-classify>ul').bind("touchstart", function (event) {
    touch_start();
});
$('.u-classify>ul').bind("touchmove", function (event) {
    touch_move('.u-classify>ul','.classfiyhead');
});

$('.scrollContent').bind("touchstart", function (event) {
    touch_start();
});
$('.scrollContent').bind("touchmove", function (event) {
    touch_move('.scrollContent','.u-waredetail-header','.u-buy');
});

var touch_start = function(){
    var touch = event.touches[0];
    startPosition = {
        x: touch.pageX,
        y: touch.pageY
    }
}
var touch_move = function(ScrollContent,top,buttom){
    var  deltaX, deltaY, moveLength, transformValue;
    transformValue = $(ScrollContent).css('transform');
    transformValue = transformValue.replace('translateY(', '');
    transformValue = transformValue.replace('px)', '') | 0;
    var touch = event.touches[0];
    endPosition = {
        x: touch.pageX,
        y: touch.pageY
    }
    deltaX = endPosition.x - startPosition.x;
    deltaY = endPosition.y - startPosition.y;
    moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
    if (deltaY > 0) {
        //down
        moveLength = parseFloat(transformValue) + moveLength;
        if (moveLength > 0)moveLength = 0;
    } else {
        var box_Height = $(ScrollContent).parent('div').height();
        var top_Height = $('body').find(top).height()|0;
        var bottom_Height = $('body').find(buttom).height()|0;
        var this_height = $(ScrollContent).height();
        maxmove = this_height-box_Height + bottom_Height ;
        console.log(bottom_Height);
        moveLength = parseFloat(transformValue)-moveLength;
        if(moveLength<-maxmove)moveLength=-maxmove;
    }
    console.log(moveLength);
    $(ScrollContent).animate({translateY: moveLength + 'px'}, 400);
};
$('.u-classify>ul>li').click(function(){
    var index = $(this).index();
    var moveH = index * signalH;
    var ht = $('.u-classify').height();
    var number = parseFloat(ht)/parseFloat(signalH);
    var maxmove = (parseInt(lastindex)-number)*signalH;
    if(moveH>maxmove) moveH = maxmove;
    $('.u-classify>ul').css('transition','all .5s ease-in-out;');
    $('.u-classify>ul').css('transform', 'translateY(-' + moveH + 'px)');
    $(this).closest('ul').find('.s-bg-white').removeClass('s-bg-white');
    $(this).addClass('s-bg-white');
    $('.u-classify_detail').eq(index).show().siblings('.u-classify_detail').hide();
});






