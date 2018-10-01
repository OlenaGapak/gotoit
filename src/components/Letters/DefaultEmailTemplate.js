import PropTypes from "prop-types";
import React, { Component } from "react";
import isEqual from "react-fast-compare";
import { FormattedDate } from "react-intl";

class DefaultEmailTemplate extends Component {
    static propTypes = {
        content: PropTypes.any,
        date: PropTypes.any,
        description: PropTypes.string,
        handleClick: PropTypes.func,
        iconSrc: PropTypes.string,
        isFavorite: PropTypes.bool,
        isRead: PropTypes.bool,
        letter: PropTypes.object,
        size: PropTypes.any,
        title: PropTypes.string
    };
    handleClick = () => {
        this.props.handleClick(this.props.content, this.props.iconSrc, this.props.letter, this.props.index);
    };
    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }
    render() {
        const { handleClick, title, description, date, isRead, iconSrc, letter, isFavorite } = this.props;
        return (
            <div className="letter card" onClick={this.handleClick}>
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
                {isFavorite ? (
                    <svg className="star_icon" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.9844 7.23438L14.5469 11.9688L16.1875 19L10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438Z"
                            fill={isRead ? "#CCCCCC" : "#2E99E5"}
                        />
                    </svg>
                ) : (
                    <svg className="done_icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 16.2188L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.78125 12L9 16.2188Z"
                            fill={isRead ? "#CCCCCC" : "#2E99E5"}
                        />
                    </svg>
                )}
            </div>
        );
    }
}

export default DefaultEmailTemplate;
