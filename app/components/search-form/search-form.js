/* eslint-disable */
const $ = window.$;

const list = $(document).find('.js-search-form-list');

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

export function searchForm () {
  $(document).on('keyup', '.js-search-form-input', function () {
    const
      input = $(this),
      val = input.val(),
      valLength = val.length,
      block = input.closest('.search-form'),
      form = block.find('.search-form__form'),
      url = form.attr('action');

    function productCard (data) {
      const html = `
        <div class="search-form__item" data-product-id="${data.id}">
            <div class="search-form__image"><img src="${data.picture}" alt="${data.name}"></div>
            <div class="search-form__texts">
                <p class="search-form__item-name">${data.name}</p>
                <p class="search-form__item-subname">${data.option}</p>
            </div>
            <div class="search-form__buttons">
                <button type="button" class="search-form__smallbutton search-form__smallbutton_search">Найти</button>
                <a class="search-form__smallbutton search-form__smallbutton_more" href="${data.link}" target="_blank">Подробнее</a>
            </div>
        </div>
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
              list.append(productCard(objects[i]));
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
  $(document).on('click', '.search-form__smallbutton_search', function () {
    const
      block = $(this).closest('.search-form__item'),
      name = block.find('.search-form__item-name').text(),
      input = block.closest('.search-form').find('input'),
      id = block.data('product-id');

    input.val(name);

    toggleList(true);
  });
}
/* eslint-enable */
