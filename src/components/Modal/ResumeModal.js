import React, { Component } from "react";
import _ from "lodash";
import { FormattedDate } from "react-intl";
import { resume_will_expire_after } from "../../game/knowledge/workers";
import { Avatar } from "../Projects/Avatar";
import CircularProgressbar from "react-circular-progressbar";
import { colors } from "../../game/knowledge/colors";

class Resume extends Component {
    render() {
        let data = this.props.data;
        let letter = this.props.letter;
        let worker = this.props.letter.object;
        let expired = this.props.letter.expired;
        let createdAt = this.props.letter.createdAt;
        let hours_to_expire = Math.round(createdAt + resume_will_expire_after - data.date.tick);
        let gender_pointer = (() => {
            if (worker.gender === "male") return "him";
            if (worker.gender === "female") return "her";
            if (worker.gender === "other") return "them";
        })();
        const buttons = (
            <div>
                <button
                    className="btn btn-md btn-danger"
                    id={worker.id}
                    onClick={e => {
                        this.props.data.helpers.rejectCandidate(e.target.id, "resumes");
                        expired = true;
                        this.props.closeModal();
                    }}
                >
                    Reject
                </button>

                <button
                    className="btn btn-md btn-success"
                    id={worker.id}
                    onClick={e => {
                        if (data.workers.length !== data.office.space) {
                            this.props.data.helpers.hireCandidate(e.target.id, "resumes");
                            worker.hired = true;
                            this.props.closeModal();
                        } else {
                            alert("Your office is full");
                        }
                    }}
                >
                    Accept
                </button>
            </div>
        );

        return (
            <section className="resume-modal">
                <div className="modal-header flexbox">
                    <div>
                        <p className="fw-700">enterpreneur resume</p>
                    </div>
                    <div>
                        <FormattedDate value={letter.date} weekday="short" day="numeric" month="short" year="numeric" hour="numeric" />
                        <span className="icon-star_border" />
                        <Avatar
                            className="worker-avatar"
                            name={worker.name}
                            sources={_.toPairs(worker.avatar)}
                            // style={{ position: 'absolute' }}
                            // size={20}
                        />
                    </div>
                </div>

                <div className="modal-body">
                    <h3 className="fw-700">{worker.name}</h3>
                    <div className="flex-element flex-container-column">
                        <div className="flex-element flex-container-row">
                            <h1 className="flex-element salary" style={{ color: `${colors.salary}` }}>
                                {worker.salary}
                            </h1>
                            {_.map(worker.stats, (item, key) => {
                                return (
                                    <div className="stats-column">
                                        <CircularProgressbar
                                            className="skills-circle flex-element"
                                            initialAnimation={true}
                                            strokeWidth={8}
                                            styles={{
                                                path: {
                                                    stroke: `${
                                                        key === "program"
                                                            ? colors.program.colorCompleted
                                                            : key === "design"
                                                                ? colors.design.colorCompleted
                                                                : colors.manage.colorCompleted
                                                    }`
                                                },
                                                text: {
                                                    fill: `${
                                                        key === "program"
                                                            ? colors.program.colorCompleted
                                                            : key === "design"
                                                                ? colors.design.colorCompleted
                                                                : colors.manage.colorCompleted
                                                    }`,
                                                    fontSize: "38px"
                                                },
                                                trail: {
                                                    stroke: `${
                                                        key === "program"
                                                            ? colors.program.colorTrail
                                                            : key === "design"
                                                                ? colors.design.colorTrail
                                                                : colors.manage.colorTrail
                                                    }`
                                                }
                                            }}
                                            percentage={Math.ceil(item * 100) / 100}
                                            text={`${(Math.ceil(item * 100) / 100).toFixed(0)}`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex-container-row flex-element">
                            <p className="flex-element stats-column salary" style={{ color: `${colors.salary}` }}>
                                Salary
                            </p>
                            <p className="flex-element stats-column" style={{ color: `${colors.design.colorCompleted}` }}>
                                Design
                            </p>
                            <p className="flex-element stats-column" style={{ color: `${colors.program.colorCompleted}` }}>
                                Program
                            </p>
                            <p className="flex-element stats-column" style={{ color: `${colors.manage.colorCompleted}` }}>
                                Manage
                            </p>
                        </div>
                    </div>

                    <h6 className="character">Character:</h6>
                    <h5 className="">{worker.character.description}</h5>
                    {expired ? <h2 className="fw-700">Enterpreneur offer has expired</h2> : ""}
                    {!worker.hired ? (
                        !expired ? (
                            buttons
                        ) : (
                            <h2 className="fw-700">This employer found another job</h2>
                        )
                    ) : (
                        <h2 className="fw-700">{`You already hired ${gender_pointer}`}</h2>
                    )}
                </div>
            </section>
        );
    }
}

Resume.propTypes = {};

export default Resume;
