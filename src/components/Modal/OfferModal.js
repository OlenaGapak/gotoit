import React, { Component } from "react";
import { skills } from "../../game/knowledge/skills";
import { project_offer_will_expire_after } from "../../game/knowledge/projects";
import { FormattedDate } from "react-intl";
import _ from "lodash";
import StatsBar from "../StatsBar";
import ProjectName from "../Projects/ProjectName";
import { Avatar } from "../Projects/Avatar";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";
import { colors } from "../../game/knowledge/colors";

class Offer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //   end_screen_project: null
        };
    }

    startOffered(id) {
        this.props.data.helpers.startOffered(id);
        this.props.closeModal();
    }

    reject(id) {
        this.props.data.helpers.rejectOffered(id);
        this.props.letter.expired = true;
        this.props.closeModal();
    }

    render() {
        const data = this.props.data;
        let letter = this.props.letter;
        let project = this.props.project;
        let createdAt = this.props.createdAt;
        let expired = this.props.expired;
        let hours_to_expire = Math.round(createdAt + project_offer_will_expire_after - data.date.tick);

        const stats_data = _.mapValues(skills, (stat, key) => {
            return { name: key, val: project.needs(key) };
        });

        console.log(letter);

        return (
            <section className="offer-modal">
                <div className="modal-header flexbox">
                    <div>
                        <Avatar className="project-avatar" sources={_.toPairs(project.avatar)} />
                    </div>
                </div>
                <div className="modal-body">
                    <h3 className="project-heading">{project.name}</h3>
                    <div key={project.id}>
                        <div className="flex-element flex-container-column description">
                            <StatsBar stats={stats_data} data={this.props.data} project={this.props.project} />

                            <div className="flex-element flex-container-row stats-row">
                                <p className="flex-element salary" style={{ color: `${colors.reputation.colorCompleted}` }}>
                                    Days to deadline
                                </p>
                                <p className="flex-element stats-column" style={{ color: `${colors.design.colorCompleted}` }}>
                                    Design
                                </p>
                                <p className="flex-element stats-column" style={{ color: `${colors.program.colorCompleted}` }}>
                                    Engineering
                                </p>
                                <p className="flex-element stats-column" style={{ color: `${colors.manage.colorCompleted}` }}>
                                    Management
                                </p>
                            </div>

                            <span className="flex-container-row">
                                <span className="reward-container flex-element flex-container-column">
                                    <h4 className="reward"> Reward:</h4>

                                    <div className="quantity" style={{ color: `${colors.salary}` }}>
                                        {project.reward}
                                        <span className="icon-usd">
                                            <span className="path1" />
                                            <span className="path2" />
                                        </span>
                                    </div>
                                </span>
                                {project.penalty > 0 ? (
                                    <span className="reward-container flex-element flex-container-column">
                                        <h4 className="reward"> Penalty:</h4>
                                        <div className="quantity penalty">
                                            {project.penalty}
                                            <span className="icon-usd-penalty">
                                                <span className="path1" />
                                                <span className="path2" />
                                            </span>
                                        </div>
                                    </span>
                                ) : (
                                    " "
                                )}
                            </span>

                            {project.stage === "ready" ? (
                                !expired ? (
                                    <div className="flex-element flex-container-column expired">
                                        <div className="btn_group">
                                            <DefaultClickSoundButton
                                                className="btn btn-danger"
                                                id={project.id}
                                                onClick={e => this.reject(project.id)}
                                            >
                                                Reject
                                            </DefaultClickSoundButton>
                                            <DefaultClickSoundButton
                                                className="btn btn-success"
                                                id={project.id}
                                                onClick={e => this.startOffered(project.id)}
                                            >
                                                Start
                                            </DefaultClickSoundButton>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="expired">This offer has expired</span>
                                )
                            ) : (
                                <span className="taken">You already took this offer</span>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Offer;
