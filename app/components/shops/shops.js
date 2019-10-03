/* eslint-disable */
const $ = window.$;

import '@fancyapps/fancybox';

export function shops () {
  $(document).on('click', '.js-select-shop', function () {
    const
      image = $(this).find('.shops__image img').attr('src'),
      address = $(this).find('.shops__title').text(),
      addressBlock = $(document).find('.shops-bar__button-wrap_shop span'),
      shopsBar = $(document).find('.shops-bar');

    shopsBar.addClass('is-active');
    addressBlock.text(address);
    shopsBar.find('.shops-bar__logo').attr('src', image);

    $.fancybox.close();
  });
}
/* eslint-enable */
