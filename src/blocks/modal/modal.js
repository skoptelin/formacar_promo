import scrollLock from 'scroll-lock';
import { makeModalFrame } from "../../js/libs/modal";
import { selectTweaker } from "../../js/libs/selectTweaker";

(() => {
	const setPlayButton = (content, video) => {
		let play = content.querySelector('.modal__play');

		if (!! video?.canPlayType) {
			video.controls = true;
			play ||= document.createElement('button');
			play.className = 'modal__play';
			play.addEventListener('click', (e) => video.play());
			content.append(play);

			['pause', 'ended', 'playing'].forEach((event) => {
				video.addEventListener(event, (e) => {
					play.classList.toggle('playing', !(video.paused || video.ended));
				});
			});
		} else {
			content.querySelectorAll('video').forEach((video) => video.pause());
			play?.remove();
		}
	}

	const modal = makeModalFrame({ 
		select: '[data-modal]', 
		scrollLock,
		open: function({ slideshow }) {
			const active = slideshow ? '.active': '';
			const form = this.querySelector('form.form');

			setPlayButton(this, this.querySelector(`video${active}`));
			selectTweaker(this.querySelectorAll('.form__field_select'));

			this.querySelectorAll('.form__field').forEach(field => {
				field.addEventListener('click', () => field.classList.remove('form__field_error'));
				field.querySelector('textarea')?.addEventListener('input', function() {
					this.style.height = Math.max(this.scrollHeight, this.offsetHeight) + 'px';
				}); 
			});

			form[0].addEventListener('keypress', (e) => {
				let char = String.fromCharCode(e.keyCode);
				if (/^[0-9"'|/`~<?>:;\\{}\[\]!@#\$%\^\&*\)\(+=._-]+$/g.test(char)) {
					e.preventDefault();
				}
			});

			form[2].addEventListener('keypress', (e) => {
				let char = String.fromCharCode(e.keyCode);
				if (!/^[0-9+()-]+$/g.test(char)) {
					e.preventDefault();
				}
			});

			form[2].addEventListener('focus', function (e) {
				if (e.target.value.length < 1) {
					e.target.value = '+';
				}
			});

			form[2].addEventListener('blur', function (e) {
				if (e.target.value === '+') {
					e.target.value = '';
				}
			});

			form.addEventListener('submit', (e) => {
				e.preventDefault();
				grecaptcha.ready(function() {
					grecaptcha.execute('6Lev38wZAAAAAHKnX3dtsNNjBTmmC37VmQg9SQHv', {action: 'submit'}).then(function (token) {
						let formData = new FormData(form);
						let isOk = true;
						let sData = [];
						for (let entry of formData.entries()) {
							if (entry[0] === 'name') {
								if (entry[1].length < 3) {
									form[0].parentNode.classList.add('form__field_error');
									isOk = false;
								} else {
									sData['name'] = entry[1];
								}
							}
							if (entry[0] === 'topic') {
								if (!entry[1].length) {
									form[1].parentNode.classList.add('form__field_error');
									isOk = false;
								} else {
									sData['topic'] = entry[1];
								}
							}
							if (entry[0] === 'phone') {
								if (entry[1].length < 3) {
									form[2].parentNode.classList.add('form__field_error');
									isOk = false;
								} else {
									sData['phone'] = entry[1];
								}
							}
							if (entry[0] === 'email') {
								if (entry[1].length < 3) {
									form[3].parentNode.classList.add('form__field_error');
									isOk = false;
								} else {
									sData['email'] = entry[1];
								}
							}
							if (entry[0] === 'message') {
								if (entry[1].length < 3) {
									form[4].parentNode.classList.add('form__field_error');
									isOk = false;
								} else {
									sData['message'] = entry[1];
								}
							}
						}

						if (isOk) {
							fetch('https://api.formacar.com/api/v1/user/webfeedback', {
								method: 'POST',
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									'topic': sData['topic'],
									'message': sData['message'],
									'name': sData['name'],
									'phone': sData['phone'],
									'email': sData['email'],
								}),
							}).then((response) => {
								if (response.status !== 200) {
									form.querySelector('.form__message').textContent = 'Error sending message';
									form.querySelector('.form__message').className = 'form__message form__message_error';
									return;
								} else {
									form.querySelector('.form__message').textContent = 'The message was sent successfully';
									form.querySelector('.form__message').className = 'form__message form__message_success';
									return;
								}
							});
						}
					});
				});
			});

		},
		move: function() {
			setPlayButton(this, this.querySelector('video.active'));
		}
	});

	modal.body.addEventListener('swiped-left', (e) => modal.move(-1));
	modal.body.addEventListener('swiped-right', (e) => modal.move());

})();