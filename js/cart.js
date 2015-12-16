/**
 * User: huyy
 * Date: 2015/12/3 0003
 * Time: 下午 2:31
 */


$('.cart-list').swipeLeft(function(){
    $(this).find('.list-con').animate({translateX: '-'+20+'%'}, 400);
    $(this).find('a').show();

});

$('.cart-list').swipeRight(function(){
    $(this).find('.list-con').animate({translateX: 0}, 400);
    $(this).find('a').hide();
});

$('.cart-list>a').click(function(){
    $(this).closest('.cart-list').remove();
})
/*全选 反选*/
$(".u-settlement>p.u-checkbox>input[type='checkbox']").click(function(){
    if($(this).attr('checked')==true){
        $('.content').find("input[type='checkbox']").attr('checked','true');
        return;
    }
    $('.content').find("p.u-checkbox>input[type='checkbox']").removeAttr('checked');
    $(this).removeAttr('checked');
});