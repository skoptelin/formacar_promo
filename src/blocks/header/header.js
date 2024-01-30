(() => {
	
	let header = document.querySelector('.header');
	let hero = document.querySelector('.hero');

	window.addEventListener('scroll', () => {
		const box = hero.getBoundingClientRect();
		header.classList[(box.bottom < 0) ? 'add': 'remove']('showed');
	});

})();
