import PropTypes from "prop-types";
import React, { Component } from "react";
import _ from "lodash";
import ProjectEndScreen from "../Projects/ProjectEndScreen";
import HistoricalEvent from "../HistoricalEvent";
import HotOffer from "../HotOffer";
import Modal from "../Modal/Modal";
import Resume from "../Modal/ResumeModal";
import Offer from "../Modal/OfferModal";
import { FormattedDate } from "react-intl";
import { Avatar } from "../Projects/Avatar";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

import mail from "../../assets/images/icon/browser/1-mail.png";
import pr from "../../assets/images/icon/browser/2-pr.png";
import office from "../../assets/images/icon/browser/3-office.png";
import market_analysis from "../../assets/images/icon/browser/4-market-analysis.png";
import loans from "../../assets/images/icon/browser/5-loans.png";
import bsex from "../../assets/images/icon/browser/6-bsex.png";
import archive from "../../assets/images/icon/browser/7-archive.png";

import clients from "../../assets/images/icon/service/pr/clients.png";
import employees from "../../assets/images/icon/service/pr/employees.png";

import news from "../../assets/images/icon/service/news.png";

import SVGInline from "react-svg-inline";

class Mail extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            current_modal: null,
            letters: null,
            show_modal: false
        };
    }
    closeModal = () => {
        this.setState({ show_modal: false });
    };
    markAllAsRead = () => {
        _.map(this.props.data.mailbox, letter => {
            letter.isRead = true;
        });
    };

    render() {
        const data = this.props.data;
        const inverted_mailbox = (() => {
            let array = [];
            for (let i = data.mailbox.length - 1; i >= 0; i--) {
                array.push(data.mailbox[i]);
            }
            return array;
        })();
        let handleClick;

        const letters = _.map(inverted_mailbox, (letter, i) => {
            switch (letter.type) {
                case "Project report":
                    handleClick = () => {
                        this.setState({
                            current_modal: <ProjectEndScreen closeModal={this.closeModal} key={i} letter={letter} data={this.props.data} />
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    letter.title = "Project report: " + letter.object.name;
                    letter.description = "Customer: " + letter.object.company + ". Stage: " + letter.object.stage + ".";
                    break;

                case "Hot offer":
                    handleClick = () => {
                        this.setState({
                            current_modal: <HotOffer closeModal={this.closeModal} key={i} letter={letter.object} data={this.props.data} />
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    letter.title = "Hot project offer: " + letter.object.name;
                    letter.description =
                        "Reward: $" +
                        letter.object.reward +
                        ". Estimate: Design " +
                        letter.object.estimate.design +
                        " Program " +
                        letter.object.estimate.program +
                        " Manage " +
                        letter.object.estimate.program;
                    break;
                case "Resume":
                    handleClick = () => {
                        this.setState({
                            current_modal: <Resume closeModal={this.closeModal} key={i} letter={letter} data={this.props.data} />
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    letter.title = "Employee offer: " + letter.object.name;
                    letter.description =
                        "Salary: $" +
                        letter.object.salary +
                        ". Skills: Design: " +
                        letter.object.stats.design +
                        ", Program: " +
                        letter.object.stats.program +
                        ", Manage: " +
                        letter.object.stats.manage +
                        ".";
                    break;
                case "Offer":
                    handleClick = () => {
                        this.setState({
                            current_modal: (
                                <Offer
                                    letter={letter}
                                    closeModal={this.closeModal}
                                    key={i}
                                    expired={letter.expired}
                                    createdAt={letter.createdAt}
                                    project={letter.object}
                                    data={this.props.data}
                                />
                            )
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    letter.title = "Project offer: " + letter.object.company + " " + letter.object.name;
                    letter.description =
                        "Reward: $" +
                        letter.object.reward +
                        ". Estimate: Design: " +
                        letter.object.estimate.design +
                        ", Program: " +
                        letter.object.estimate.program +
                        ", Manage: " +
                        letter.object.estimate.manage +
                        ".";
                    break;
                case "Event":
                    handleClick = () => {
                        this.setState({
                            current_modal: (
                                <HistoricalEvent closeModal={this.closeModal} key={i} content={letter.object} date={letter.date} />
                            )
                        });
                        this.setState({ show_modal: true });

                        letter.isRead = true;
                    };
                    letter.title = "World news: " + letter.object.name;
                    letter.description = letter.object.description;
                    break;
                default:
                    break;
            }
            return (
                <div className="letter card" onClick={handleClick} key={i}>
                    {(() => {
                        switch (letter.type) {
                            case "Resume":
                                return <img src={employees} className="mail-icon" />;
                            case "Offer":
                                return <img src={clients} className="mail-icon" />;
                            case "Hot offer":
                                return <img src={clients} className="mail-icon" />;
                            case "Event":
                                return <img src={news} className="mail-icon" />;
                            case "Office":
                                return <img src={office} className="mail-icon" />;
                            default:
                                return <img src={pr} className="mail-icon" />;
                        }
                    })()}
                    <h6 className="letter-title">{letter.title}</h6>
                    <p className="letter-description">{letter.description}</p>
                    <span className="formatted-date">
                        <FormattedDate
                            value={letter.date}
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
                            fill={letter.isRead ? "#CCCCCC" : "#2E99E5"}
                        />
                    </svg>
                    {/*<SVGInline
                        svg={
                            <svg
                                className="done_icon"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 16.2188L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.78125 12L9 16.2188Z"
                                    fill={letter.isRead ? "#CCCCCC" : "#2E99E5"}
                                />
                            </svg>
                        }
                    />*/}
                </div>
            );
        });

        return (
            <div className="mail">
                <div className="mail-menu">
                    <DefaultClickSoundButton className="mark-all-btn" onClick={this.markAllAsRead}>
                        Mark all as read
                    </DefaultClickSoundButton>
                    <div className="left-side">
                        <DefaultClickSoundButton className="mark-all-btn" onClick={this.markAllAsRead}>
                            Mark all as read
                        </DefaultClickSoundButton>
                        <DefaultClickSoundButton className="mark-all-btn" onClick={this.markAllAsRead}>
                            Mark all as read
                        </DefaultClickSoundButton>
                    </div>
                </div>

                {letters}
                {this.state.show_modal ? (
                    <Modal closeModal={this.closeModal} showCloseButton={true}>
                        {" "}
                        {this.state.current_modal}
                    </Modal>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default Mail;
