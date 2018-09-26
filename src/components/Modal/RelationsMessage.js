import React from "react";
import { FormattedDate } from "react-intl";

const RelationsMessage = props => {
    return (
        <div className="relations-modal">
            <div className="modal-header" />
            <div className="modal-message">
                <p className="title">Good morning!</p>
                <p className="message">
                    {"Congratulations with starting your company! We hope it will flourish!\n" +
                        "You will undoubtedly need a little help on your way to success."}
                </p>
                <p className="message">
                    {"We would like to inform you that 'Relations' service provides several useful features.\n" +
                        "First of all, you need to know that every company has a reputation and rumours."}
                </p>
                <p className="message">
                    {
                        "Rumours engage specialists to your company and good reputation makes your company more competitive in the market. That's how it works in IT world. So, more rumours — more resumes you get, more reputation — more offers."
                    }
                </p>
                <p className="message">{'Please visit "Relations" tab to know more about the service.\n'}</p>
            </div>
            <div />
        </div>
    );
};

export default RelationsMessage;
