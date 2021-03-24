const $menu_popup = $('.menu-popup');

function slideToggleElement(element){
  element.slideToggle(300, function(){
    if (element.is(':hidden')) {
      $('body').removeClass('body_pointer');
    } else {
      $('body').addClass('body_pointer');
    }					
  }); 
  return false;
}

/** плавный переход по ссылкам */
//example from https://gnatkovsky.com.ua/yakorya-i-plavnyj-perexod-po-yakornym-ssylkam.html

function scrollTo(id_navigation){
    $(id_navigation).on("click","a", function (event) {
        event.preventDefault();
        const id  = $(this).attr('href'),
            top = $(id).offset().top;                  
        $('body,html').animate({scrollTop: top}, 1500);
        slideToggleElement($menu_popup);
    });
}

$(document).ready(function(){
    scrollTo("#navigation-popup");
    scrollTo("#navigation-top");    
    scrollTo("#navigation-footer");      


/* slick slider */
$('.carousel').slick({    
    slidesToShow:4,
    slidesToScroll: 1,   
    speed:200,
    prevArrow:document.getElementById("slick-prev"),
    nextArrow:document.getElementById("slick-next"),
    responsive: [
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

/* menu popup*/
	$(".navigation-humb, .menu-popup__close").on("click", function () {
    slideToggleElement($menu_popup);
    return false;
});		
	
	$(document).on('click', function(e){
		if (!$(e.target).closest('.menu-popup').length){
			$('body').removeClass('body_pointer');
			$menu_popup.slideUp(300);
		}
	});

});