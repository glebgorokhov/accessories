/* eslint-disable */

/**
 * REMOVE IT
 *
 * Скрипты можно писать тут, либо подключать с помощь https://github.com/coderhaoxin/gulp-file-include
 *
 * ВАЖНО: Файлы просто подключаются, без транспиляции (babel) минификации, поэтому нужно писать на ES5
 * Так же доступа к блокам, которые собираются с помощью вебпака не будет.
 */

@@include('../../node_modules/sticky-kit/dist/sticky-kit.min.js')
@@include('../../node_modules/parsleyjs/dist/parsley.min.js')

$('.js-sticky').stick_in_parent({
  "offset_top": 130,
});

// Позиционирование слайдера в мобайле
if ($('.product__left').length > 0) {
  function sliderPosition() {
    $('.product__left').css({
      top: 95 + ($('.product__title').outerHeight() - 26) + 'px',
    });
  }

  sliderPosition();

  $(window).resize(sliderPosition);
}

/* eslint-enable */
