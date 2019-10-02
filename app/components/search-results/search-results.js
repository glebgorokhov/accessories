/* eslint-disable */
const $ = window.$;

export function searchResults () {
  $(document).on('click', '.js-search-results-map', function () {
    $(this).closest('.search-results').addClass('is-active');
  });

  $(document).on('click', '.js-search-results-list', function () {
    $(this).closest('.search-results').removeClass('is-active');
  });
}
/* eslint-enable */
