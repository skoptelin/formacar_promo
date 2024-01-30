import { scrollClassToggle } from "../../js/libs/scroll";
import enquire from 'enquire.js';
import Swiper from 'swiper';
import { Mousewheel, Pagination, EffectFade, Keyboard } from 'swiper/modules';

(() => {
	let swiper;
	const wrapper = document.querySelector('.slider > .swiper-wrapper');
	const buttons = wrapper.querySelectorAll('a.down');
	const toggle = scrollClassToggle({ class: 'showed' });
	const heroButton = document.querySelector('a.hero__button[href="#partner"]');
	const slidesCount = wrapper.querySelectorAll('.slider__slide').length - 1;

	const classToggle = (sw) => {
		sw.slides.forEach((slide, index) => {
			slide.querySelectorAll('[data-animation]').forEach((item) => {
				item.classList[(index === sw.activeIndex) ? 'add': 'remove']('showed');
			});
		});
	}

	const enableSwiper = () => {
		return new Swiper(".slider.swiper", {
			modules: [Mousewheel, Pagination, EffectFade, Keyboard],
			slidesPerView: 1,
			speed: 800,
			direction: 'vertical',
			mousewheel: true,
			effect: "fade",
			fadeEffect: { crossFade: true },
			keyboard: {
				enabled: true,
				onlyInViewport: true
			},
			pagination: {
				el: '.slider__dots',
				clickable: true,
				bulletClass: 'slider__dot',
				bulletActiveClass: 'active'
			},
			on: {
				afterInit: classToggle,
				activeIndexChange: classToggle
			}
		});
	}

	const slideNext = () => swiper.slideNext();
	
	enquire.register("screen and (min-width: 961px)", {
		match: function() {
			swiper = enableSwiper();
			buttons.forEach((button) => button.addEventListener('click', slideNext));
			heroButton.addEventListener('click', () => swiper.slideTo(slidesCount, 800));
			if (window.location.hash === '#partner') {
				swiper.slideTo(slidesCount, 800);
			}
		},
		unmatch: function() {
			if (swiper !== undefined ) {
				swiper.destroy(true, true);
				buttons.forEach((button) => button.removeEventListener('click', slideNext));
			}

			toggle.init();
		}
	});

})();