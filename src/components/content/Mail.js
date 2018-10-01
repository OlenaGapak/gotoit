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
import NewsMessage from "../Modal/NewsMessage";
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
import DefaultEmailTemplate from "../Letters/DefaultEmailTemplate";
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
            index: null,
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
            onlyFavorites: !this.state.onlyFavorites,
            show_modal: false
        });
    };

    getState = (index, letter) => {
        if (!letter) return {};
        let object = letter.object || {};
        let _states = {
            "Project report": {
                content: <ProjectEndScreen closeModal={this.closeModal} key={index} letter={letter} data={this.props.data} />,
                title: `Project report: ${_.get(object, "name")} `,
                description: `Customer: ${_.get(object, "company")}. 
                Stage: ${_.get(object, "stage")}.`,
                iconSrc: pr
            },
            "Hot offer": {
                content: <HotOffer closeModal={this.closeModal} key={index} letter={letter} data={this.props.data} />,
                title: `Hot project offer: ${_.get(object, "name")}`,
                description: `Reward: $${_.get(object, "reward")}. Estimate: Design ${_.get(object, "estimate.design")} Program 
                ${_.get(object, "estimate.program")} Manage ${_.get(object, "estimate.program")}`,
                iconSrc: clients
            },
            Resume: {
                content: <Resume closeModal={this.closeModal} key={index} letter={letter} data={this.props.data} />,
                title: `Employee offer: ${_.get(object, "name")}`,
                description: `Salary: $${_.get(object, "salary")}.
                 Skills: Design: ${_.get(object, "stats.design")}, Program:  ${_.get(object, "stats.program")}, Manage: ${_.get(
                    object,
                    "stats.manage"
                )}.`,
                iconSrc: employees
            },
            Offer: {
                content: (
                    <Offer
                        letter={letter}
                        closeModal={this.closeModal}
                        key={index}
                        expired={letter.expired}
                        createdAt={letter.createdAt}
                        project={object}
                        data={this.props.data}
                    />
                ),
                title: `Project offer: ${_.get(object, "company")}
                 ${_.get(object, "name")}`,
                description: `Reward: $${_.get(object, "reward")}. Estimate: Design:
                 ${_.get(object, "estimate.design")}, Program:  ${_.get(object, "estimate.program")}, Manage: ${_.get(
                    object,
                    "estimate.manage"
                )}.`,
                iconSrc: clients
            },
            Event: {
                content: <NewsMessage closeModal={this.closeModal} key={index} content={letter.object} />,
                title: `World news: ${_.get(object, "name")}`,
                description: _.get(object, "description"),
                iconSrc: news
            },
            Welcome: {
                content: <WelcomeMessage closeModal={this.closeModal} key={index} content={object} date={letter.date} />,
                title: `Welcome to the new world of IT`,
                description: "Hello! So you've started your own company. That is so ...",
                iconSrc: mail
            },
            Relations: {
                content: <RelationsMessage closeModal={this.closeModal} key={index} date={letter.date} />,
                title: `Relations introduce`,
                description: "Good morning! Congratulations with starting your company! We hope ...",
                iconSrc: pr
            },
            Office: {
                content: (
                    <OfficeMessage
                        closeModal={this.closeModal}
                        haveOffice={this.props.data.office.size > 1}
                        key={index}
                        date={letter.date}
                    />
                ),
                title: `Office introduce`,
                description:
                    this.props.data.office.size > 1
                        ? "We are glad you chose our service to rent an office. Hope you enjoy it."
                        : "What we want to do is offer you a nice modern office.",
                iconSrc: office
            },
            Analytics: {
                content: <AnalyticsMessage closeModal={this.closeModal} key={index} date={letter.date} />,
                title: `Analytics introduce`,
                description: "Greetings. It's time to talk about serious stuff. The IT market is very dynamic ...",
                iconSrc: market_analysis
            }
        };
        return {
            ..._states[letter.type],
            date: letter.date,
            isFavorite: letter.favorite,
            isRead: letter.isRead,
            letter
        };
    };
    toggleFavorite = letter => {
        letter.favorite = !letter.favorite;
        return letter.favorite;
    };
    handleClick = (content, iconSrc, letter, index) => {
        this.setState({
            index
        });
        this.setState({ show_modal: true });
        letter.isRead = true;
    };
    render() {
        const data = this.props.data;
        const inverted_mailbox = _.reverse([...data.mailbox]);
        const filtered_mailbox = this.state.onlyFavorites ? _.filter(inverted_mailbox, "favorite") : inverted_mailbox;
        const openLetter = filtered_mailbox[this.state.index];
        const { content, iconSrc } = this.getState(this.state.index, openLetter);
        return (
            <div className="mail">
                <div className="mail-menu">
                    <DefaultClickSoundButton className="mark-all-btn" onClick={this.markAllAsRead}>
                        <div>
                            {"Mark all as read "}
                            <SVGInline
                                className="done-all-svg"
                                svg={
                                    '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M0 13.4062L1.40625 12L6.98438 17.5781L5.57812 18.9844L0 13.4062ZM21.7969 5.57812L23.25 6.98438L11.25 18.9844L5.625 13.4062L7.07812 12L11.25 16.1719L21.7969 5.57812ZM17.5781 6.98438L11.25 13.3594L9.84375 11.9531L16.1719 5.57812L17.5781 6.98438Z"/> </svg>'
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
                                        '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M21.9844 9.23438L16.5469 13.9688L18.1875 21L12 17.25L5.8125 21L7.45312 13.9688L2.01562 9.23438L9.1875 8.625L12 2.01562L14.8125 8.625L21.9844 9.23438Z"/> </svg>'
                                    }
                                />
                                {" Interested"}
                            </div>
                        </DefaultClickSoundButton>
                    </div>
                </div>

                {_.map(filtered_mailbox, (letter, i) => (
                    <DefaultEmailTemplate {...this.getState(i, letter)} index={i} handleClick={this.handleClick} key={i} />
                ))}
                {this.state.show_modal &&
                    openLetter && (
                        <MailModal
                            closeModal={this.closeModal}
                            icon={iconSrc}
                            toggleFavorite={() => this.toggleFavorite(openLetter)}
                            type={openLetter.type}
                            date={openLetter.date}
                            favorite={openLetter.favorite}
                        >
                            {content}
                        </MailModal>
                    )}
            </div>
        );
    }
}

export default Mail;
