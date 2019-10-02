/* eslint-disable */
import {freeze, unfreeze} from "../../blocks/js-functions/freeze";

const $ = window.$;

import {pageWrapToggle} from "../page-content-wrap/page-content-wrap";

const
  burger = $(document).find('.js-filters-block'),
  burgerButton = $(document).find('.js-open-filters');

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

export function filters () {
  $(document).on('click', '.js-open-filters', function () {
    showBurger();
  });

  $(document).on('click', '.js-close-filters', function () {
    closeBurger();
  });

  $(window).resize(function () {
    if ($(window).width() >= globalOptions.sizes.lg && burger.hasClass('is-active')) {
      closeBurger();
    }
  });
}
/* eslint-enable */
