//example from https://gnatkovsky.com.ua/yakorya-i-plavnyj-perexod-po-yakornym-ssylkam.html
function scrollTo(id_navigation){
    $(id_navigation).on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;                  
        $('body,html').animate({scrollTop: top}, 1500);
    });
}

$(document).ready(function(){
    scrollTo("#navigation-top");
    scrollTo("#navigation-footer");    
});