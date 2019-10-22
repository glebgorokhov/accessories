/* eslint-disable */
const $ = window.$;

const list = $(document).find('.js-city-list');

export function toggleList (hide) {
  if (hide) {
    if (list.hasClass('is-active')) {
      list.removeClass('is-active');

      setTimeout(() => {
        list.hide();
      }, globalOptions.animationDuration);
    }
  } else {
    if (!list.hasClass('is-active')) {
      list.show(0, function () {
        $(this).addClass('is-active')
      });
    }
  }
}

export function cityList () {
  $(document).on('keyup', '.js-city-input', function () {
    const
      input = $(this),
      val = input.val(),
      valLength = val.length,
      block = input.closest('.popup-shops'),
      form = block.find('.popup-shops__form'),
      url = form.attr('action');

    function cityCard (data) {
      const html = `
        <div class="city-list__item">${data.name}</div>
      `;

      return html;
    }

    // Подгрузка данных, показ/скрытие подсказок
    if (valLength > 2) {
      $.ajax({
        url: url,
        data: form.serialize(),
        success: function (json) {
          let objects = json;
          list.html('');

          if (objects.length > 0) {
            $.each(objects, function (i) {
              list.append(cityCard(objects[i]));
            });

            toggleList();
          } else {
            toggleList(true);
          }
        },
      });
    } else {
      toggleList(true);
    }
  });

  // Клик по товару
  $(document).on('click', '.city-list__item', function () {
    const
      name = $(this).text(),
      input = $(this).closest('.popup-shops').find('.js-city-input');

    input.val(name);

    toggleList(true);
  });
}
/* eslint-enable */
