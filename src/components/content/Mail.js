import PropTypes from "prop-types";
import React, { Component } from "react";
import _ from "lodash";
import ProjectEndScreen from "../Projects/ProjectEndScreen";
import HistoricalEvent from "../HistoricalEvent";
import HotOffer from "../HotOffer";
import MailModal from "../Modal/MailModal";
import Resume from "../Modal/ResumeModal";
import Offer from "../Modal/OfferModal";
import WelcomeMessage from "../Modal/WelcomeMessage";
import RelationsMessage from "../Modal/RelationsMessage";
import OfficeMessage from "../Modal/OfficeMessage";
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
import AnalyticsMessage from "../Modal/AnalyticsMessage";

class Mail extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            current_modal: null,
            letters: null,
            show_modal: false,
            onlyFavorites: false
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
    toggleFavoriteFilter = () => {
        this.setState({
            onlyFavorites: !this.state.onlyFavorites
        });
    };

    render() {
        const data = this.props.data;
        let mailbox = _.clone(data.mailbox);
        _.reverse(mailbox);
        const filtered_mailbox = this.state.onlyFavorites ? _.filter(mailbox, "favorite") : mailbox;
        let handleClick;
        const letters = _.map(filtered_mailbox, (letter, i) => {
            const toggleFavorite = () => {
                letter.favorite = !letter.favorite;
                return letter.favorite;
            };
            switch (letter.type) {
                case "Project report":
                    handleClick = () => {
                        this.setState({
                            current_modal: (
                                <MailModal
                                    closeModal={this.closeModal}
                                    toggleFavorite={toggleFavorite}
                                    favorite={letter.favorite}
                                    icon={market_analysis}
                                    type={letter.type}
                                    date={letter.date}
                                >
                                    <ProjectEndScreen closeModal={this.closeModal} key={i} letter={letter} data={this.props.data} />
                                </MailModal>
                            )
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
                            current_modal: (
                                <MailModal
                                    closeModal={this.closeModal}
                                    icon={clients}
                                    toggleFavorite={toggleFavorite}
                                    favorite={letter.favorite}
                                    type={letter.type}
                                    date={letter.date}
                                >
                                    <HotOffer closeModal={this.closeModal} key={i} letter={letter.object} data={this.props.data} />
                                </MailModal>
                            )
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
                            current_modal: (
                                <MailModal
                                    closeModal={this.closeModal}
                                    icon={employees}
                                    toggleFavorite={toggleFavorite}
                                    favorite={letter.favorite}
                                    type={letter.type}
                                    date={letter.date}
                                >
                                    <Resume closeModal={this.closeModal} key={i} letter={letter} data={this.props.data} />
                                </MailModal>
                            )
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
                                <MailModal
                                    closeModal={this.closeModal}
                                    icon={clients}
                                    toggleFavorite={toggleFavorite}
                                    favorite={letter.favorite}
                                    type={"Project offer"}
                                    date={letter.date}
                                >
                                    <Offer
                                        letter={letter}
                                        closeModal={this.closeModal}
                                        key={i}
                                        expired={letter.expired}
                                        createdAt={letter.createdAt}
                                        project={letter.object}
                                        data={this.props.data}
                                    />
                                </MailModal>
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
                                <MailModal
                                    closeModal={this.closeModal}
                                    icon={news}
                                    toggleFavorite={toggleFavorite}
                                    favorite={letter.favorite}
                                    type={letter.type}
                                    date={letter.date}
                                >
                                    <HistoricalEvent closeModal={this.closeModal} key={i} content={letter.object} date={letter.date} />
                                </MailModal>
                            )
                        });
                        this.setState({ show_modal: true });

                        letter.isRead = true;
                    };
                    letter.title = "World news: " + letter.object.name;
                    letter.description = letter.object.description;
                    break;
                case "Welcome":
                    handleClick = () => {
                        this.setState({
                            current_modal: (
                                <MailModal
                                    closeModal={this.closeModal}
                                    icon={mail}
                                    toggleFavorite={toggleFavorite}
                                    favorite={letter.favorite}
                                    type={letter.type}
                                    date={letter.date}
                                >
                                    <WelcomeMessage closeModal={this.closeModal} key={i} date={letter.date} />
                                </MailModal>
                            )
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    letter.title = "Welcome to the new world of IT";
                    letter.description = "Hello! So you've started your own company. That is so ...";
                    break;
                case "Relations":
                    handleClick = () => {
                        this.setState({
                            current_modal: (
                                <MailModal
                                    closeModal={this.closeModal}
                                    icon={pr}
                                    toggleFavorite={toggleFavorite}
                                    favorite={letter.favorite}
                                    type={letter.type}
                                    date={letter.date}
                                >
                                    <RelationsMessage closeModal={this.closeModal} key={i} date={letter.date} />
                                </MailModal>
                            )
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    letter.title = "Relations introduce";
                    letter.description = "Good morning! Congratulations with starting your company! We hope ...";
                    break;
                case "Office":
                    let haveOffice = data.office.size > 1;
                    handleClick = () => {
                        this.setState({
                            current_modal: (
                                <MailModal
                                    closeModal={this.closeModal}
                                    icon={pr}
                                    toggleFavorite={toggleFavorite}
                                    favorite={letter.favorite}
                                    type={letter.type}
                                    date={letter.date}
                                >
                                    <OfficeMessage closeModal={this.closeModal} haveOffice={haveOffice} key={i} date={letter.date} />
                                </MailModal>
                            )
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    letter.title = "Office introduce";
                    letter.description =
                        haveOffice > 1
                            ? "We are glad you chose our service to rent an office. Hope you enjoy it."
                            : "What we want to do is offer you a nice modern office.";
                    break;
                case "Analytics":
                    handleClick = () => {
                        this.setState({
                            current_modal: (
                                <MailModal
                                    closeModal={this.closeModal}
                                    icon={market_analysis}
                                    toggleFavorite={toggleFavorite}
                                    favorite={letter.favorite}
                                    type={letter.type}
                                    date={letter.date}
                                >
                                    <AnalyticsMessage closeModal={this.closeModal} key={i} date={letter.date} />
                                </MailModal>
                            )
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    letter.title = "Analytics introduce";
                    letter.description = "Greetings. It's time to talk about serious stuff. The IT market is very dynamic ...";
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
                            case "Welcome":
                                return <img src={mail} className="mail-icon" />;
                            case "Relations":
                                return <img src={pr} className="mail-icon" />;
                            case "Analytics":
                                return <img src={market_analysis} className="mail-icon" />;
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
                    {letter.favorite ? (
                        <svg
                            className="done_icon"
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.9844 7.23438L14.5469 11.9688L16.1875 19L10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438Z"
                                fill={letter.isRead ? "#CCCCCC" : "#2E99E5"}
                            />
                        </svg>
                    ) : (
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
                    )}
                </div>
            );
        });

        return (
            <div className="mail">
                <div className="mail-menu">
                    <DefaultClickSoundButton className="mark-all-btn" onClick={this.markAllAsRead}>
                        <div>
                            {"Mark all as read "}
                            <SVGInline
                                className="done-all-svg"
                                svg={
                                    '<svg className="done-all-ico" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <path d="M0 13.4062L1.40625 12L6.98438 17.5781L5.57812 18.9844L0 13.4062ZM21.7969 5.57812L23.25 6.98438L11.25 18.9844L5.625 13.4062L7.07812 12L11.25 16.1719L21.7969 5.57812ZM17.5781 6.98438L11.25 13.3594L9.84375 11.9531L16.1719 5.57812L17.5781 6.98438Z" /> </svg>'
                                }
                            />
                        </div>
                    </DefaultClickSoundButton>
                    <div className="left-side">
                        <DefaultClickSoundButton
                            className={`interested-btn ${this.state.onlyFavorites ? "active" : ""}`}
                            onClick={this.toggleFavoriteFilter}
                        >
                            <div>
                                <SVGInline
                                    className={`star-svg ${this.state.onlyFavorites ? "active" : ""}`}
                                    svg={
                                        '<svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg" > <path d="M19.9844 7.23438L14.5469 11.9688L16.1875 19L10 15.25L3.8125 19L5.45312 11.9688L0.015625 7.23438L7.1875 6.625L10 0.015625L12.8125 6.625L19.9844 7.23438Z" /> </svg>'
                                    }
                                />
                                {" Interested"}
                            </div>
                        </DefaultClickSoundButton>
                    </div>
                </div>

                {letters}
                {this.state.show_modal ? this.state.current_modal : <div />}
            </div>
        );
    }
}

export default Mail;
