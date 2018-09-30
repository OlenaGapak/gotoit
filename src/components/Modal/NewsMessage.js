import React from "react";

const NewsMessage = props => {
    return (
        <div className="news-modal">
            <div className="modal-header" />
            <div className="modal-message">
                <p className="title">{props.content.name}</p>
                <p className="message">{props.content.description}</p>
            </div>
        </div>
    );
};

export default NewsMessage;
