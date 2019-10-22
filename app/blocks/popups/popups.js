/* eslint-disable */
// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import { freeze, unfreeze } from '../js-functions/freeze';
import { closeBurger } from "../../components/header/header";

const $ = window.$;

export default function popups() {
  $('.js-fancybox').fancybox({
    afterLoad: function () {
      freeze();

      setTimeout(() => {
        closeBurger();
        freeze();
      }, globalOptions.animationDuration);
    },
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
