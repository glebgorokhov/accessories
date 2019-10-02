/* eslint-disable */
const $ = window.$;

import {freeze, unfreeze} from "../../blocks/js-functions/freeze";
import {pageWrapToggle} from "../page-content-wrap/page-content-wrap";

// #######################
// Показ бургера
const
  burger = $(document).find('.js-burger-menu'),
  burgerButton = $(document).find('.js-burger-button');

export function showBurger() {
  $(window).scrollTop(0);
  freeze();

  burgerButton.addClass('is-active');
  pageWrapToggle();
  burger.show(0, function () {
    $(this).addClass('is-active');
  });
}

export function closeBurger() {
  burger.removeClass('is-active');
  burgerButton.removeClass('is-active');
  unfreeze();
  pageWrapToggle(true);

  setTimeout(() => {
    burger.hide();
  }, globalOptions.animationDuration);
}

export function burgerMenuShow() {
  $(document).on('click', '.js-burger-button', function () {
    showBurger();
  });

  $(document).on('click', '.js-burger-close', function () {
    closeBurger();
  });

  $(window).resize(function () {
    if ($(window).width() >= globalOptions.sizes.lg && burger.hasClass('is-active')) {
      closeBurger();
    }
  });
}
/* eslint-enable */
