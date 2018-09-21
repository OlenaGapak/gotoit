import button from "../../assets/sounds/button.wav";
import click from "../../assets/sounds/click.wav";
import tab from "../../assets/sounds/tab.wav";
import new_mail from "../../assets/sounds/new-mail.wav";
import bubble_add from "../../assets/sounds/buble-add.wav";
import bubble_colapse from "../../assets/sounds/buble-colapse.wav";
import new_day from "../../assets/sounds/new-day.wav";
import price_down from "../../assets/sounds/price-down.wav";
import price_up from "../../assets/sounds/price-up.wav";
import success from "../../assets/sounds/success.wav";
import failed from "../../assets/sounds/failed.wav";
import dismission from "../../assets/sounds/dismission.wav";
import React from "react";

export const sounds = {
    button_click: button, //кнопки
    click: click, //Клик по иконке (изменение скорости, закрытия, навыка и пр.)
    tab_click: tab,
    new_message: new_mail,
    bubble_appear: bubble_add,
    bubble_burst: bubble_colapse,
    new_day_alarm: new_day,
    charge_money: price_down,
    earn_money: price_up,
    finish_project: success,
    fail_project: failed,
    dismissal: dismission
};

const makeSoundOnClick = (Component, sound_name) => {
    class HOC extends React.Component {
        makeAudio = () => {
            let audio = new Audio(sounds[sound_name]);
            audio.play();
        };

        render() {
            let props = this.props;
            return (
                <Component
                    {...props}
                    onClick={() => {
                        if(this.props.onClick){
                        this.makeAudio();
                        this.props.onClick();}
                    }}
                />
            );
        }
    }

    return HOC;
};

const just_button = props => (
    <button className={props.className} onClick={props.onClick} style={props.style}>
        {props.children}
    </button>
);
const just_a_link = props => (
    <a className={props.className} onClick={props.onClick}>
        {props.children}
    </a>
);

export const DefaultClickSoundButton = makeSoundOnClick(just_button, "button_click");
export const TabClickSoundButton = makeSoundOnClick(just_a_link, "tab_click");
