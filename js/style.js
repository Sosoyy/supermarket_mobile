/**
 * User: huyy
 * Date: 2015/11/9 0009
 * Time: ÏÂÎç 5:17
 */
var swiper = new Swiper('.u-scrollcontent', {
    loop: true, autoplay: 2000, pagination: '.swiper-pagination',
});

$('footer>ul>li').click(function(){
    $(this).find('i.fill').show();
    $(this).siblings('li').find('i.line').show();
    $(this).find('i.line').hide();
    $(this).siblings('li').find('i.fill').hide();

});