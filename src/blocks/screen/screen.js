import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

(() => {
	document.querySelectorAll('.screen__side.swiper')?.forEach((item, i) => {
		new Swiper(item, {
			modules: [Navigation, Pagination, EffectFade],
			spaceBetween: 0,
			slidesPerView: 1,
			nested: true,
			effect: "fade",
			fadeEffect: { crossFade: true },
			navigation: {
				prevEl: `.pagination_${i} .pagination__button_prev`,
				nextEl: `.pagination_${i} .pagination__button_next`
			},
			pagination: {
				el: `.pagination_${i} .pagination__dots`,
				bulletClass: 'pagination__dot',
				bulletActiveClass: 'active',
				clickable: true
			},
			on: {
				beforeInit: function(slider) {
					const navigation = document.createElement('div');
					const pagination = document.createElement('div');
					const prev = document.createElement('button');
					const next = document.createElement('button');

					navigation.className = `screen__navigation pagination pagination_${i}`;
					pagination.className = 'pagination__dots';
					prev.className = 'pagination__button pagination__button_prev';
					next.className = 'pagination__button pagination__button_next';

					if (item.querySelectorAll('.swiper-slide').length > 1) {
						navigation.append(prev);
						navigation.append(pagination);
						navigation.append(next);
						slider.el.append(navigation);
					}
				},
			}
		});
	});

})();