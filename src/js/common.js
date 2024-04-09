import "./polyfills.js";
import "./blocks.js";
import "../../node_modules/swiped-events/dist/swiped-events.min.js";
import { selectTweaker } from "../js/libs/selectTweaker";

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

/* Modal feedback with recaptcha */

let getDetailsButton         = document.querySelector("#get_details");
let modalFeedback            = document.querySelector("#feedback_recaptcha");
let modalFeedbackCloseButton = modalFeedback.querySelector("#feedback_recaptcha_close");
let modalFeedbackSubmit      = modalFeedback.querySelector("#submit_feedback");
let form                     = modalFeedback.querySelector(".form");

getDetailsButton.addEventListener("click", showModalFeedback);

function showModalFeedback() {
    if (modalFeedback) {
        modalFeedback.classList.add("modal__show");
        modalFeedbackCloseButton.addEventListener("click", hideModalFeedback);
        window.addEventListener("click", hideModalFeedbackOutZone);
        modalFeedbackSubmit.addEventListener("click", submitFeedbackForm);
        modalFeedback.querySelector('.form__message').className = 'form__message';
        modalFeedback.querySelector('.form__message').textContent = '';
        selectTweaker(modalFeedback.querySelectorAll('.form__field_select'));

        modalFeedback.querySelectorAll('.form__field').forEach(field => {
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
    }
}

function submitFeedbackForm(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let isOk     = true;
    let sData    = [];

    let response = grecaptcha.getResponse();
    if(response.length == 0) {
        form[5].parentNode.classList.add('form__recaptcha_error');
        isOk = false;
    } else {
        form[5].parentNode.classList.remove('form__recaptcha_error');
    }

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
            if (entry[1].length < 3 || validateEmail(entry[1]) === false) {
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
                setTimeout(() => {
                    grecaptcha.reset();
                    hideModalFeedback();
                    removeFormInputValue();
                }, 1000);
                return;
            }
        });
    }
}

function hideModalFeedback() {
    modalFeedback.classList.remove("modal__show");
    modalFeedbackCloseButton.removeEventListener("click", hideModalFeedback);
    modalFeedbackSubmit.removeEventListener("click", submitFeedbackForm);
    window.removeEventListener("click", hideModalFeedbackOutZone);
    window.grecaptcha.reset();
}

function hideModalFeedbackOutZone(event) {
    let modal             = modalFeedback.querySelector(".modal__body");
    let modal_boundaries  = event.composedPath().includes(modal);
    let button_boundaries = event.composedPath().includes(getDetailsButton);
    if (!modal_boundaries && !button_boundaries) {
      hideModalFeedback();
    }
}

function removeFormInputValue() {
    let modalBody  = form.querySelector(".form__body");
    let formFields = modalBody.querySelectorAll("label");
    formFields.forEach(field => {
        if (field.lastElementChild) {
            field.lastElementChild.value = "";
        }
    })
}

function validateEmail(input) {
    let validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (input.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

/* END Modal feedback with recaptcha */