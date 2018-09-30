import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import isEqual from "react-fast-compare";
import { FormattedDate } from "react-intl";

class DefaultEmailTemplate extends PureComponent {
    static propTypes = {
        date: PropTypes.any,
        description: PropTypes.string,
        iconSrc: PropTypes.any,
        isRead: PropTypes.bool,
        onClick: PropTypes.func,
        size: PropTypes.any,
        title: PropTypes.string
    };

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }
    render() {
        const { onClick, title, description, date, isRead, iconSrc } = this.props;
        return (
            <div className="letter card" onClick={onClick}>
                <img src={iconSrc} className="mail-icon" />
                <h6 className="letter-title">{title}</h6>
                <p className="letter-description">{description}</p>
                <span className="formatted-date">
                    <FormattedDate
                        value={date}
                        // weekday="short"
                        day="numeric"
                        month="short"
                        // year="numeric"
                        hour="numeric"
                    />
                </span>
                <svg className="done_icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 16.2188L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.78125 12L9 16.2188Z"
                        fill={isRead ? "#CCCCCC" : "#2E99E5"}
                    />
                </svg>
            </div>
        );
    }
}

export default DefaultEmailTemplate;
