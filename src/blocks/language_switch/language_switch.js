(() => {

    let not_selected_language_switch_box = document.querySelector('.language_switch__box.not_selected');
    let selected_language_switch_box     = document.querySelector('.language_switch__box.selected');

    selected_language_switch_box.addEventListener('click', show_language_list);
    not_selected_language_switch_box.addEventListener('click', change_language);

    function show_language_list() {
        let language_switch                      = selected_language_switch_box.parentNode;
        let new_not_selected_language_switch_box = document.querySelector('.language_switch__box.not_selected');
		language_switch.classList.toggle("language_switch__active");
        new_not_selected_language_switch_box.classList.toggle("not_active");
    };

    function change_language() {
        let selected_language_switch_box     = document.querySelector('.language_switch__box.selected');
        let not_selected_language_switch_box = document.querySelector('.language_switch__box.not_selected');
        let language_switch                  = selected_language_switch_box.parentNode;
        let parent_selector                  = language_switch.parentNode;

        not_selected_language_switch_box.removeEventListener('click', change_language);
        selected_language_switch_box.removeEventListener('click', show_language_list);

        not_selected_language_switch_box.addEventListener('click', show_language_list);
        selected_language_switch_box.addEventListener('click', change_language);
       
        not_selected_language_switch_box.classList.remove("not_selected");
        not_selected_language_switch_box.classList.add("selected");
        selected_language_switch_box.classList.remove("selected");
        selected_language_switch_box.classList.add("not_selected");
        selected_language_switch_box.classList.toggle("not_active");
        language_switch.classList.toggle("language_switch__active");

        selected_language_switch_box = document.querySelector('.language_switch__box.selected');
        change_language_switch_location(selected_language_switch_box, parent_selector);
    }

    function change_language_switch_location(selected_language_switch_box, parent_selector) {
        let selected_language = selected_language_switch_box.querySelector('.text').id;
        let logo_selector     = document.querySelectorAll(".screen__head");
        if(selected_language == 'arab'){
            parent_selector.style = "justify-content: flex-start";
            logo_selector.forEach(selector => selector.style = "justify-content: flex-end");
            
        } else {
            parent_selector.style = "justify-content: flex-end";
            logo_selector.forEach(selector => selector.style = "justify-content: flex-start");
        }
    }

})();