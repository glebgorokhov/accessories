/* eslint-disable */
const $ = window.$;

export function pageWrapToggle (hide) {
  const block = $('.js-page-content');

  if (!hide) {
    block.addClass('is-active');
  } else {
    block.removeClass('is-active');
  }
}
/* eslint-enable */
