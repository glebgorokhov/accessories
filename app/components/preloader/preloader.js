/* eslint-disable */
const $ = window.$;

import { freeze, unfreeze } from "../../blocks/js-functions/freeze";

const block = $('.preloader');

export function preloader () {
  window.preloaderShow = function () {
    freeze();

    block.show(0, function () {
      block.addClass('is-active');
    });
  };

  window.preloaderHide = function () {
    block.removeClass('is-active');
    unfreeze();

    setTimeout(() => {
      block.hide();
    }, globalOptions.animationDuration);
  };
}
/* eslint-enable */
