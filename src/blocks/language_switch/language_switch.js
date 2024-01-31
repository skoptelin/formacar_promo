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
        let selected_language    = selected_language_switch_box.querySelector('.text').id;
        let logo_selector        = document.querySelectorAll(".screen__head");
        let hero_buttons         = document.querySelector(".hero__buttons");
        let screen_content       = document.querySelectorAll(".screen__content");
        let screen_info          = document.querySelectorAll(".screen__info");
        let final_screen_content = document.querySelector("#final_screen_content");
        const window_width       = window.innerWidth;
        if(selected_language == 'arab'){
            if(parent_selector.classList.contains('showed')){
                parent_selector.style = "flex-direction: row-reverse; justify-content: space-between"
            } else {
                parent_selector.style = "justify-content: flex-start";
            }

            if(window_width <= 960) {
                screen_content.forEach(selector => selector.style = "flex-direction: column");
                hero_buttons.style         = "flex-direction: column";
                final_screen_content.style = "flex-direction: column; padding-right: 0;";
            } else {
                screen_content.forEach(selector => selector.style = "flex-direction: row-reverse");
                hero_buttons.style         = "flex-direction: row-reverse";
                final_screen_content.style = "flex-direction: row";
            }
            logo_selector.forEach (selector => selector.style = "justify-content: flex-end");
            screen_info.forEach   (selector => selector.style = "text-align: right; padding-right: 0;");
            
        } else {
            if(parent_selector.classList.contains('showed')){
                parent_selector.style = "flex-direction: row; justify-content: space-between"
            } else {
                parent_selector.style = "justify-content: flex-end";
            }

            if(window_width <= 960) {
                screen_content.forEach(selector => selector.style = "flex-direction: column");
                hero_buttons.style         = "flex-direction: column";
                final_screen_content.style = "flex-direction: column; padding-right: 0;";
            } else {
                screen_content.forEach(selector => selector.style = "flex-direction: row");
                hero_buttons.style         = "flex-direction: row";
                final_screen_content.style = "flex-direction: row";
            }
            logo_selector.forEach (selector => selector.style = "justify-content: flex-start");
            screen_info.forEach   (selector => selector.style = "text-align: left; padding-right: 65px;");  
        }
    }

})();