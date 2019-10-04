/* eslint-disable */
// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import { freeze, unfreeze } from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
  $('.js-fancybox').fancybox({
    afterLoad: freeze,
    afterClose: unfreeze,
    touch: false,
  });

  $(document).on('submit', '.js-ajax-form', function (e) {
    e.preventDefault();

    const
      form = $(this),
      url = form.attr('action'),
      data = form.serialize();

    $.ajax({
      type: "post",
      url: url,
      data: data,
      success: function (data) {
        console.log('Form sent.')
      },
    });

    $.fancybox.open({
      src: '#popup-success',
      opts: {
        afterLoad: freeze,
        afterClose: unfreeze,
        touch: false,
      },
    });

    return false;
  });
}
/* eslint-enable */
