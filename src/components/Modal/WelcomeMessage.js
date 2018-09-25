import React from "react";
import { FormattedDate } from "react-intl";
import bg from "../../assets/images/modal/welcome-modal-bg.png";
import start_empty from "../../assets/svg/icon/star-empty.svg";
import start_full from "../../assets/svg/icon/star-empty.svg";

const WelcomeMessage = props => {
    return (
        <div className="welcome-modal">
            <div className="modal-header" />
            <div className="modal-message">
                <p className="title">Welcome to the new world of IT</p>
                <p
                    style={{
                        whiteSpace: "pre-wrap"
                    }}
                    className="message"
                >
                    {"Hello! So you've started your own company. That is so brave of you!\n" +
                        "You'll need a powerful tool to communicate with the world. That tool is a mailbox.\n" +
                        "There are four types of letters you will receive:"}
                </p>
                <p className="message">{"1. Resume. This is how you can hire a new employee — he (or she) will send a CV to your mail."}</p>
                <p className="message">
                    {
                        "2. Offer. It's hard to say what's better - to be a freelancer or to create your own projects. If you want to take an offer from another company - go to your mail box and look for this kind of letter. Otherwise, if you prefer your own product, start it by pressing \"New project\" button."
                    }
                </p>
                <p className="message">
                    {
                        "3. Project report. If you complete a project, you probably will want to know if it was successful. Check out a project report to learn about a result in details."
                    }
                </p>
                <p className="message">
                    {
                        "4. Event. That means something happened in the world. You are too busy to read news, so we are going to filter the most important world news for you."
                    }
                </p>
            </div>
            <div />
        </div>
    );
};

export default WelcomeMessage;
