import React from "react";

const OfficeMessage = props => {
    return (
        <div className="office-modal">
            <div className="modal-header" />
            <div className="modal-message">
                <p className="title">Hello, big boss!</p>
                <p className="message">
                    {props.haveOffice
                        ? "We are glad you chose our service to rent an office. Hope you enjoy it.\n"
                        : "What we want to do is offer you a nice modern office.\n" +
                          +"Notice that with an office you have a cleaner for free! It's our gift for you."}
                </p>
                <p className="message">
                    {"Monthly price:\n" +
                        "Small office (4 workplaces) — 500$\n" +
                        "Medium office (7 workplaces) — 2 500$\n" +
                        "Big office (10 workplaces) — 10 000$"}
                </p>
                <p className="message">
                    {
                        "To rent an office use button \"Rent an office\" above your avatar. If you don't see the button — it means you already have an office. In that case you will have an opportunity to rent bigger office when you'll have as many workers as its possible to place in your current office."
                    }
                </p>
            </div>
            <div />
        </div>
    );
};

export default OfficeMessage;
