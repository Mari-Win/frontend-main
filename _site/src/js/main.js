import 'inputmask';
import TabsManager from './tabs.js';
import ExpandableText from './expandable.js';
import OrderForm from './forms/order-form';

/** menu popup */
const $menuPopup = $('.menu-popup');

function slideToggleElement(element) {
  element.slideToggle(300, function () {
    $('body').toggleClass('body_pointer', element.is(':hidden'));
  });
  return false;
}

/** плавный переход по ссылкам */
//example from https://gnatkovsky.com.ua/yakorya-i-plavnyj-perexod-po-yakornym-ssylkam.html

function scrollTo(id_navigation) {
  $(id_navigation).on('click', 'a', function (event) {
    event.preventDefault();
    const id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
    if (id_navigation === '#navigation-popup') {
      slideToggleElement($menuPopup);
    }
  });
}

/**
   * Validate forms
   */
 function validateForm(formId, formSubmitButtonId) {
  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "Please check your input."
  );

  $(formId).validate({
    rules: {
      name: {
        required: true,
        regex: /^[a-zA-ZА-Яа-я'.\\s]{3,25}$/,
        minlength: 3
      },
      phone: {
        required: true,
        regex: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,18}$/,
        minlength: 7
      },
    },
    messages: {
      name: "Разрешено от 3 до 25 символов русского и латинского алфавита.",
      phone: "Введите телефон в указанном формате",
    },
  });

  $(formSubmitButtonId).click(function (event) {
    if (!$(formId).valid()) {
      event.preventDefault();
    }
  });
}

$(function () {
  scrollTo('#navigation-popup');
  scrollTo('#navigation-top');
  scrollTo('#navigation-footer');


  /** slick slider */
  $('.carousel').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 200,
    prevArrow: document.getElementById('slick-prev'),
    nextArrow: document.getElementById('slick-next'),
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
    ]
  });

  /** menu popup */
  $('.navigation-humb, .menu-popup__close').on('click', function () {
    slideToggleElement($menuPopup);
    return false;
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.menu-popup').length) {
      $('body').removeClass('body_pointer');
      $menuPopup.slideUp(300);
    }
  });

  /** Expandable text */
  const textElems = document.querySelectorAll('.expandable-text');

  for (const el of textElems) {
    new ExpandableText(el, 395);
  }

  /** Price Tabs */
  const tabsElem = document.getElementById('price');
  new TabsManager(tabsElem);

  /**
   * Init forms with data
   */
  new OrderForm('order-form', true);
  new OrderForm('order-form-short', false);

  /**
   * Validate forms
   */
  validateForm('#order-form', '#order-form-submit');
  validateForm('#order-form-short', '#order-form-short-submit');

  /**
   * Input mask for phones
   */
  let selector = document.getElementsByClassName('order-form__phone');
  Array.from(selector).forEach(element => {
    Inputmask({ 'mask': '+7-(999)-999-99-99' }).mask(element);
  });

  /**
   * add selected index for selectbox masters in order-form
   */
  $('.master-card')
    .fancybox({
      'afterLoad': function () {
        try {
          const masterId = this.opts.$orig.context.id.replace('master', '');
          document.getElementById('order-form').elements.masterId.selectedIndex = masterId;
        } catch (error) {
          console.log(error);
        }
      }
    });

  /**
 * add selected index for selectbox popitem in order-form
 */
  $('.pop-item__btn')
    .fancybox({
      'afterLoad': function () {
        try {
          const serviceId = this.opts.$orig.context.id.replace('pop-item_', '');
          document.getElementById('order-form').elements.serviceId.selectedIndex = serviceId;
        } catch (error) {
          console.log(error);
        }
      }
    });
});