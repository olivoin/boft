$(document).ready(function() {
    
    $('.location-header .location-header-title').click(function() {
        $(this).closest('.location-header').toggleClass('active');
    });
    
    $('.location-header-close').click(function() {
        $(this).closest('.location-header').toggleClass('active');
    });
    
    $('.location-header-list').on('click', '.location-header-list-cities-list-object', function() {
        var cityName = $(this).html();
        $('.location-header').toggleClass('active');
        $('.location-header-title').text(cityName);
        console.log(cityName);
    }); 
    
    // json
    
    $(function () {
	var $Countries = {},
		countryWrapper = $('[data-wrapper="countries"]'),
		countryItemTemplate = $.trim($('[data-id="country-item"]').text()),

		cityWrapper = $('[data-wrapper="cities"]'),
		cityListTemplate = $.trim($('[data-id="city-list"]').text()),
		cityItemTemplate = $.trim($('[data-id="city-item"]').text()),

		placeWrapper = $('[data-wrapper="places"]'),
		placeListTemplate = $.trim($('[data-id="place-list"]').text()),
		placeItemTemplate = $.trim($('[data-id="place-item"]').text()),

		addressItemTemplate = $.trim($('[data-id="address-item"]').text()),

		activeClass = 'item-active',
		hiddenClass = 'item-hidden';

	$.ajax({
		url: 'https://admin.boft.ru/widgets/api/locations.json',
		method: 'get',
		dataType: 'json'
	}).done(function (data) {
		var countries = [];

		data.forEach(function (item) {
			var wrapper = $(countryItemTemplate
				.replace('{id}', item.id)
				.replace('{name}', item.name));

			$Countries[item.id] = $.extend(item, {
				wrapper: wrapper.appendTo(countryWrapper)
			});
		});
		countryReaction(data[0]);
	}).fail(function () {

	});

	countryWrapper.on('click', '[data-action="country"]', function () {
		countryReaction($Countries[$(this).data('id')]);
	});
	cityWrapper

	function countryReaction (countryItem) {
		// cityWrapper.empty();
		// cityWrapper.children().remove();
		countryItem.wrapper.addClass(activeClass)
			.siblings('.' + activeClass).removeClass(activeClass);

		if (countryItem.cities && countryItem.cities.length) {
			cityWrapper.removeClass(hiddenClass);

			// Если нет готового списка городов
			if (!countryItem.citiesList) {
				var cities = [];

				// В люъекте добавили список городов для дальнейшего нахождения
				countryItem.cities_ = {};
				countryItem.activeID = countryItem.cities[0].id;
				// Создали список и сохранили в объекте для этой страны
				countryItem.citiesList = $(cityListTemplate);
				countryItem.cities.forEach(function (item) {
					var wrapper = $(cityItemTemplate
						.replace('{id}', item.id)
						.replace('{name}', item.name));

					// Заполняем новый объект со списком городов
					countryItem.cities_[item.id] = $.extend(item, {
						wrapper: wrapper.appendTo(countryItem.citiesList)
					});
					// И строим элементы для вставки на страницу
					cities.push(wrapper);
				});
				countryItem.citiesList
					// Навесили обработчик
					.on('click', '[data-action="city"]', function () {
						countryItem.activeID = $(this).data('id');
						// Передаем город с помощью ранее записанного в страну списка городов
						cityReaction(countryItem.cities_[countryItem.activeID]);
					});
				// Вставили список городов
				cityWrapper.append(countryItem.citiesList);
			}

			countryItem.citiesList.removeClass(hiddenClass)
				.siblings().addClass(hiddenClass);
			cityReaction(countryItem.cities_[countryItem.activeID]);
		} else {
			cityWrapper.addClass(hiddenClass);
			cityReaction();
		}

		function cityReaction (cityItem) {
			placeWrapper.empty();

			if (cityItem) {
				cityItem.wrapper.addClass(activeClass)
					.siblings('.' + activeClass).removeClass(activeClass);

				if (cityItem.places && cityItem.places.length) {
					// Если нет готового списка мест
					if (!cityItem.placesList) {
						var places = [];

						cityItem.places_ = {};
						// Создаем новый список и сохраняем в объекте
						cityItem.placesList = $(placeListTemplate);
						cityItem.places.forEach(function (item, index) {
							var id = item.id || index.toString(),
								address = [];

							cityItem.places_[id] = item;

							item.address.forEach(function (item) {
								address.push(addressItemTemplate.replace('{text}', item));
							});
							places.push(placeItemTemplate
								.replace('{name}', item.name)
								.replace('{list}', address.join(''))
							);
						});
						cityItem.placesList
							.append(places)
							.on('click', '[data-action="place"]', function () {
								var place = $(this),
									placeID = place.data('id'),
									placeItem = cityItem.places_[placeID];
                                
							});
					}

					if (cityItem.placesList) {
						placeWrapper
							.removeClass(hiddenClass)
							// Вставляем список мест на страницу
							.append(cityItem.placesList);
					} else {
						placeWrapper.addClass(hiddenClass);
					}
				} else {
					placeWrapper.addClass(hiddenClass);
				}
			} else {
				placeWrapper.addClass(hiddenClass);
			}
		}
	}
});
    
// console.log(data);
    
});