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
import DefaultEmailTemplate from "../Letters/DefaultEmailTemplate";
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
    getState = (index, letter) => {
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
                content: <HistoricalEvent closeModal={this.closeModal} key={index} content={object} date={letter.date} />,
                title: `World news: ${_.get(object, "name")}`,
                description: _.get(object, "description"),
                iconSrc: news
            }
        };
        return {
            ..._states[letter.type],
            date: letter.date
        };
    };
    render() {
        const data = this.props.data;
        const inverted_mailbox = _.reverse([...data.mailbox]);
        let handleClick;
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

                {_.map(inverted_mailbox, (letter, i) => (
                    <DefaultEmailTemplate {...this.getState(i, letter)} />
                ))}
                {this.state.show_modal ? (
                    <Modal closeModal={this.closeModal} showCloseButton={true}>
                        {this.state.current_modal}
                    </Modal>
                ) : null}
            </div>
        );
    }
}

export default Mail;
