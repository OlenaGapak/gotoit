import React, { Component } from "react";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";
import start_empty from "../../assets/svg/icon/star-empty.svg";
import start_full from "../../assets/svg/icon/star-empty.svg";
import { FormattedDate } from "react-intl";

class MailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: this.props.favorite
        };
    }
    toggleFavorite = () => {
        this.setState({
            favorite: this.props.toggleFavorite()
        });
    };
    render() {
        return (
            <div className={"modal-backdrop " + this.props.className}>
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-elements">
                                <div>
                                    <img className="icon" src={this.props.icon} />
                                    <p className="type">{this.props.type} </p>
                                </div>
                                <div>
                                    <p className="date">
                                        <FormattedDate
                                            value={this.props.date}
                                            weekday="short"
                                            day="numeric"
                                            month="short"
                                            year="numeric"
                                            hour="numeric"
                                        />
                                    </p>
                                    {this.state.favorite ? (
                                        <DefaultClickSoundButton className="favorite" onClick={this.toggleFavorite}>
                                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M19.9844 7.23438L14.5469 11.9688L16.1875 19L10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </DefaultClickSoundButton>
                                    ) : (
                                        <DefaultClickSoundButton className="favorite" onClick={this.toggleFavorite}>
                                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10 13.4219L13.75 15.6719L12.7656 11.4062L16.0938 8.5L11.6875 8.125L10 4.09375L8.3125 8.125L3.90625 8.5L7.23438 11.4062L6.25 15.6719L10 13.4219ZM19.9844 7.23438L14.5469 11.9688L16.1875 19L10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </DefaultClickSoundButton>
                                    )}
                                    <DefaultClickSoundButton className="close-icon" onClick={this.props.closeModal}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.9844 1.42188L8.40625 7L13.9844 12.5781L12.5781 13.9844L7 8.40625L1.42188 13.9844L0.015625 12.5781L5.59375 7L0.015625 1.42188L1.42188 0.015625L7 5.59375L12.5781 0.015625L13.9844 1.42188Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </DefaultClickSoundButton>
                                </div>
                            </div>

                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MailModal;
