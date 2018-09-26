import React from "react";

const AnalyticsMessage = props => {
    return (
        <div className="analytics-modal">
            <div className="modal-header" />
            <div className="modal-message">
                <p className="title">{"Greetings. It's time to talk about serious stuff."}</p>
                <p className="message">
                    {"The IT market is very dynamic, you know. Also, it's very cruel to those who prefer ignorance to researching."}
                </p>
                <p className="message">
                    {"I want you to avoid common mistakes. So listen to me carefully.\n" +
                        "If you go to Analytics tab, you will notice that there is project rating. There are four types of rating:\n" +
                        "1) Common rating, which include all projects in the market. You should dream about reaching the top of this exact rating. It would mean you are the best of the best.\n" +
                        "2) Platform ratings. Those ratings include projects of the particular platform. It's not as solid as the first one, but getting there is certainly a way to success.\n" +
                        "3) Type ratings. It's the same as platform rating, but you know, projects are filtered by types instead of platform.\n" +
                        "4) Platform + type ratings. The least important most-important rating there is. Still, it could bring you some money."}
                </p>
                <p className="message">
                    {"Why am I telling you about ratings? The point is the cooler rating and the best place in the rating you achieve, the more money you have.\n" +
                        "Top 1 company receive half of the IT market, top 2 company — one quarter, top 3 — one-eighth, other companies fight for what's left. So, try to get a place in the front lines, champion.\n" +
                        "Before starting your project, I strongly recommend you to investigate what the market needs now. And only then start."}
                </p>
                <p className="message">
                    {"Oh, and don't forget how important for every project is to live up to the expectations. I mean to comply with the right balance between three base skills.\n" +
                        "Good luck."}
                </p>
                <p className="message">{"Truly yours, anonymous analytic."}</p>
            </div>
            <div />
        </div>
    );
};

export default AnalyticsMessage;
