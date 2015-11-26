/**
 * User: huyy
 * Date: 2015/11/25 0025
 * Time: ���� 4:13
 */
$(document).ready(function () {
    var screenHeight = $(window).height();
    $('.scrollwarpper').height(screenHeight + 'px');


});
/*ģ�������*/

var startPosition, endPosition;
$('.scrollContent').bind("touchstart", function (event) {
    touch_start();
});
$('.scrollContent').bind("touchmove", function (event) {
    touch_move('.scrollContent', '.u-waredetail-header', '.u-buy');
});

var touch_start = function () {
    var touch = event.touches[0];
    startPosition = {
        x: touch.pageX,
        y: touch.pageY
    }
}
var touch_move = function (ScrollContent, top, buttom) {
    var deltaX, deltaY, moveLength, transformValue;
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
        var top_Height = $('body').find(top).height() | 0;
        var bottom_Height = $('body').find(buttom).height() | 0;
        var this_height = $(ScrollContent).height();
        maxmove = this_height - box_Height + bottom_Height;
        moveLength = parseFloat(transformValue) - moveLength;
        if (moveLength < -maxmove)moveLength = -maxmove;
    }

    moveLength = moveLength;
    console.log(moveLength);

    $(ScrollContent).animate({translateY: moveLength + 'px'}, 400);
};

$('.u-parameter').click(function () {
    $('.cover-decision').show();
    $('.parameter').show();
});
$('.parameter>a.u-closebtn').click(function () {
    $('.cover-decision').hide();
    $('.parameter').hide();
});
$('.u-chosseClassfiy').click(function () {
    $('.cover-decision').show();
    $('.choose').show();
});
$('.choose>a.closeIcon').click(function () {
    $('.cover-decision').hide();
    $('.choose').hide();
});
$('.menuicon').click(function () {
        $('.u-topmenu ').toggle();
    }
);

$('.info-list>li>div>a').click(function(){
    $(this).addClass('s-bg-red');
    $(this).addClass('s-white');
    $(this).siblings('a').removeClass('s-bg-red');
    $(this).siblings('a').removeClass('s-white');
});

$("button.dec").click(function(){
    var val = parseInt($(this).next().val())-1;
    if(val=0)val=1;
    alert(val);
    $(this).next().html(val);
});
$("button.inc").click(function(){
    var val = parseInt($(this).prev().val())+1;
    alert(val);

    $(this).next().html(val);
});