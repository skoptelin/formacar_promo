(() => {
	
	let header_logo     = document.querySelector('.header__logo');
	let hero            = document.querySelector('.hero');
	let language_switch = document.querySelector('.language_switch');

	window.addEventListener('scroll', () => {
		let header_inner                 = document.querySelector('.header__inner');
		let selected_language_switch_box = document.querySelector('.language_switch__box.selected');
		let selected_language            = selected_language_switch_box.querySelector('.text').id;
		const box                        = hero.getBoundingClientRect();
		header_logo.classList[(box.bottom < 0) ? 'add': 'remove']('showed');
		header_inner.classList[(box.bottom < 0) ? 'add': 'remove']('showed');
		language_switch.classList[(box.bottom < 0) ? 'add': 'remove']('mobile');
		if(selected_language == 'arabic'){
			if(!header_inner.classList.contains('showed')){
				header_inner.style = "flex-direction: row; justify-content: flex-start;"
			} else {
				header_inner.style = "flex-direction: row-reverse; justify-content: space-between;"
			}
		} else {
			if(!header_inner.classList.contains('showed')){
				header_inner.style = "flex-direction: row; justify-content: flex-end;"
			} else {
				header_inner.style = "flex-direction: row; justify-content: space-between;"
			}
		}
	});

})();
