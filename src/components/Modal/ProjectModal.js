import React, { Component } from "react";
import ProjectName from "../Projects/ProjectName";
import { Avatar } from "../Projects/Avatar";
import { ReleaseButton } from "../Projects/ReleaseButton";
import { ProjectReward } from "../Projects/ProjectReward";
import { RejectButton } from "../Projects/RejectButton";
import ProjectProgressBar from "../Projects/ProjectProgressBar";
import ProjectDeadlineBar from "../Projects/ProjectDeadlineBar";
import TechToggle from "../Projects/TechToggle";
import { StatsDataItem } from "../Projects/StatsDataItem";
import { technologies } from "../../game/knowledge/technologies";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";
import ClickOutside from "react-click-outside-component";
import Select from "react-select";
import _ from "lodash";

export default class ProjectModal extends Component {
    /*static propTypes = {
        project: PropTypes.object.required,
        data: PropTypes.object.required
    };*/
    open = () => {
        this.props.data.helpers.openProject(this.props.project.id);
    };
    getStatsData = worker => {
        let { project, data } = this.props;
        let { getRelation, modifyRelation } = data.helpers;
        // let { getStatsData } = worker;
        return _.mapValues(worker.stats, (val, skill) => {
            return {
                name: skill,
                val: (
                    <StatsDataItem
                        workerId={worker.id}
                        projectId={project.id}
                        relation={getRelation}
                        skill={skill}
                        onChange={event => {
                            modifyRelation(event.target.id, project.id, event.target.checked, skill);
                        }}
                        statsData={worker.getStatsData(skill)}
                    />
                )
            };
        });
    };

    changeTechnology = event => {
        this.props.data.helpers.changeTechnology(event.target.id, this.props.project.id, event.target.checked);
    };

    addTechnology = event => {
        if (technologies[event.target.id].price <= this.props.data.money) this.props.data.helpers.unlockTechnology(event.target.id);
    };

    onRelease = () => {
        this.props.data.helpers.fixProject(this.props.project.id);
    };

    onReject = () => {
        if (window.confirm(`Reject project ${this.props.project.name}? (penalty: ${this.props.project.penalty})`)) {
            this.props.closeModal();
            this.props.data.helpers.rejectProject(this.props.project.id);
        }
    };

    manage = event => {
        this.props.data.helpers.modifyRelation(event.target.id, this.props.project.id, event.target.checked);
    };

    closeSelect = () => {
        this.props.data.helpers.changeTeamModalSelector();
    };

    onSelectChange = event => {
        this.props.data.helpers.changeTeamModalSelector();
        this.props.data.helpers.modifyRelation(event.value.id, this.props.project.id);
        this.props.data.helpers.modifyHoveredObjects();
    };

    extractTaskProgress = skill => {
        let { project } = this.props;
        let tasks = project.needs(skill);
        if (tasks === Number.POSITIVE_INFINITY) {
            tasks = 0;
        }
        let bugs = project.bugs[skill];
        let done = project.done[skill];

        let max_skill = _.maxBy(_.keys(project.estimate), function(skill) {
            return (
                Math.max(
                    project.needs(skill) !== Number.POSITIVE_INFINITY ? project.needs(skill) : 0,
                    project.estimate[skill],
                    project.done[skill]
                ) + project.bugs[skill]
            );
        });

        let max =
            Math.max(
                project.needs(max_skill) !== Number.POSITIVE_INFINITY ? project.needs(max_skill) : 0,
                project.estimate[max_skill] !== Number.POSITIVE_INFINITY ? project.estimate[max_skill] : 0,
                project.done[max_skill]
            ) + project.bugs[max_skill]; //, project.needs(max_skill)) + project.bugs[max_skill];

        if (max === 0) max = 1;

        let tasks_percent = (tasks / max) * 100;
        let bugs_percent = (bugs / max) * 100;
        let done_percent = (done / max) * 100;
        return { tasks, bugs, done, tasks_percent, bugs_percent, done_percent };
    };
    render() {
        let data = this.props.data;
        let project = this.props.project;
        let { getTechnology } = this.props.data.helpers;
        let {
            id,
            type,
            stage,
            deadline,
            deadline_max,
            iteration,
            complexity,
            reward,
            penalty,
            avatar,
            name,
            platform,
            kind,
            size,
            is_paused,
            complexity_max,
            tests
        } = this.props.project;
        let own_modal = true;
        let deadlineText = project.getDeadlineText();
        let doneQuantity = project.doneQuantity();
        let planedTasksQuantity = project.planedTasksQuantity;
        let taskQuantity = project.tasksQuantity();
        let bugsQuantity = project.bugsQuantity();
        let projectTechnologies = this.props.projectTechnologies;
        const tech_label = (() => {
            let tech_keys = data.projects_known_technologies;
            return _.map(tech_keys, (tech_name, i) => {
                let enabled = data.projects_technologies[project.id][tech_name];
                return (
                    <TechToggle
                        key={i}
                        data={data}
                        name={tech_name}
                        project={project}
                        tech={technologies[tech_name]}
                        enabled={enabled}
                        own_modal={own_modal}
                    />
                );
            });
        })();
        let team_ids = {};
        _.keys(data.relations).forEach(worker_id => {
            let worker_projects = data.relations[worker_id];
            _.keys(worker_projects).forEach(project_id => {
                let relation = worker_projects[project_id];
                if (relation && project_id === project.id) {
                    team_ids[worker_id] = true;
                }
            });
        });
        let team = [];
        data.workers.forEach(worker => {
            if (worker.id in team_ids && worker.get_monthly_salary && data.helpers.deepCheckRelation(worker, project)) {
                team.push(worker);
            }
        });

        return (
            <section
                style={{
                    padding: "34px",
                    width: "680px",
                    height: "670px"
                }}
            >
                <div className="flex-container-row">
                    <div className="modal-header flex-container-column">
                        <Avatar sources={_.toPairs(avatar)} style={{ height: "96px", width: "120px" }} className="project-avatar" />
                    </div>
                    <div className="flex-element flex-container-column col-9" style={{ width: "100%", paddingLeft: "32px" }}>
                        <div className="flex-element">
                            <ProjectName
                                {...{
                                    size,
                                    platform,
                                    kind,
                                    name,
                                    reward,
                                    penalty
                                }}
                                deadlineText={deadlineText}
                            />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="flex-element flex-container-row">
                                <ProjectReward reward={reward} penalty={penalty} project={project} />
                            </div>
                            <div className="flex-element">
                                <span
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignSelf: "flex-end"
                                    }}
                                >
                                    <ReleaseButton doneQuantity={doneQuantity} type={type} stage={stage} onClick={this.onRelease} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {project.type !== "own" ? (
                    <div className="flex-container-row" style={{ width: "100%" }}>
                        <div className="flex-container-row" style={{ width: "100%", marginBottom: "24px" }}>
                            <div className="col-3">
                                <div className="flexbox">
                                    <h5
                                        style={{
                                            color: "rgba(0, 51, 51, 0.6)",
                                            fontSize: "13px",
                                            lineHeight: "15px",
                                            width: "65%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-end"
                                        }}
                                    >
                                        <span>Done:</span>
                                    </h5>
                                    <h2
                                        style={{
                                            color: "#2E9999",
                                            fontWeight: "bold",
                                            fontSize: "24px",
                                            lineHeight: "24px",
                                            width: "35%",
                                            textAlign: "left"
                                        }}
                                    >
                                        {project.iteration}
                                    </h2>
                                </div>
                            </div>
                            <div className="col-9" style={{ width: "100%", paddingLeft: "32px", paddingRight: "0" }}>
                                <ProjectDeadlineBar project={project} />
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="flex-container-row" style={{ marginBottom: "32px" }}>
                    <div className="flex-container-row" style={{ width: "100%" }}>
                        <div
                            className="col-3"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                minHeight: "72px"
                            }}
                        >
                            <div className="flexbox">
                                <h5
                                    style={{
                                        color: "rgba(0, 51, 51, 0.6)",
                                        fontSize: "13px",
                                        lineHeight: "15px",
                                        width: "65%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <span>Iteration:</span>
                                </h5>
                                <h2
                                    style={{
                                        color: "#2E9999",
                                        fontWeight: "bold",
                                        fontSize: "24px",
                                        lineHeight: "24px",
                                        width: "35%",
                                        textAlign: "left"
                                    }}
                                >
                                    {project.iteration}
                                </h2>
                            </div>
                            <div className="flexbox" style={{ marginTop: "18px" }}>
                                <h5
                                    style={{
                                        color: "rgba(0, 51, 51, 0.6)",
                                        fontSize: "13px",
                                        lineHeight: "15px",
                                        width: "65%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <span>Complexity:</span>
                                </h5>
                                <h2
                                    style={{
                                        color: "#2E9999",
                                        fontWeight: "bold",
                                        fontSize: "24px",
                                        lineHeight: "24px",
                                        width: "35%",
                                        textAlign: "left"
                                    }}
                                >
                                    {project.complexity}
                                </h2>
                            </div>
                        </div>
                        <div className="col-9" style={{ paddingLeft: "32px", paddingRight: "0" }}>
                            <ProjectProgressBar project={project} own_modal={own_modal} />
                        </div>
                    </div>
                </div>
                <div className="flex-container-row">
                    <div className="col-6" style={{ height: "300px", overflow: "auto" }}>
                        <h4 style={{ fontSize: "16px", lineHeight: "19px", color: "#7A9999", fontWeight: "bold", opacity: "60%" }}>
                            <span className="icon-workers" />
                            Workers on project
                        </h4>
                        <DefaultClickSoundButton
                            style={{
                                width: "100%",
                                height: "30px",
                                backgroundColor: "#3DCCCC",
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginBottom: "16px"
                            }}
                            className={`btn btn-add-worker ${data.project_team_modal_selector === id ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeTeamModalSelector(project);
                            }}
                        >
                            <span style={{ fontSize: "13px", lineHeight: "15px", paddingLeft: "15%" }}>Add employee on project</span>
                            <span className="icon-add" style={{ color: "#fff" }} />
                        </DefaultClickSoundButton>
                        {data.project_team_modal_selector === id ? (
                            <ClickOutside onClickOutside={this.closeSelect} className="select">
                                <Select
                                    onChange={this.onSelectChange}
                                    style={{ marginBottom: "10px" }}
                                    options={(() => {
                                        let arr = [];
                                        data.workers.forEach(worker => {
                                            if (!_.includes(team, worker)) {
                                                arr.push({ value: worker, label: worker.name });
                                            }
                                        });
                                        return arr;
                                    })()}
                                    value={null}
                                />
                            </ClickOutside>
                        ) : null}
                        <div style={{ display: "block", justifyContent: "space-around" }}>
                            {team.map((worker, i) => {
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            width: "100%",
                                            height: "44px",
                                            border: "1px solid rgba(0, 51, 51, 0.2)",
                                            borderRadius: "2px",
                                            marginBottom: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-around"
                                        }}
                                    >
                                        <span style={{ height: "32px", width: "32px" }}>
                                            <Avatar
                                                className="player-avatar"
                                                name={worker.name}
                                                style={{ position: "absolute" }}
                                                size={32}
                                                sources={_.toPairs(worker.avatar)}
                                            />
                                        </span>
                                        <span>{worker.name}</span>
                                        <span>
                                            <span
                                                className="icon-program"
                                                style={{
                                                    marginRight: "8px",
                                                    fontSize: "18px",
                                                    color: "var(--color-program)"
                                                }}
                                            />
                                            <span className="icon-design" style={{ fontSize: "18px", color: "var(--color-design)" }} />
                                            <span
                                                className="icon-manage"
                                                style={{
                                                    marginLeft: "8px",
                                                    fontSize: "18px",
                                                    color: "var(--color-manage)"
                                                }}
                                            />
                                        </span>
                                        <span style={{ width: "2px", height: "24px", backgroundColor: "rgba(0, 51, 51, 0.2)" }} />
                                        <button
                                            onClick={() => {
                                                data.helpers.kickWorker(worker, project);
                                            }}
                                            style={{
                                                backgroundColor: "transparent",
                                                outline: "none",
                                                cursor: "pointer",
                                                color: "#7A9999",
                                                backgroundRepeat: "no-repeat",
                                                border: "none",
                                                lineHeight: "0.5",
                                                padding: "0",
                                                fontSize: "2.5rem",
                                                fontWeight: "300",
                                                margin: "0",
                                                zIndex: "1",
                                                paddingRight: "8px"
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-6" style={{ height: "300px", overflow: "auto" }}>
                        <h4 style={{ fontSize: "16px", lineHeight: "19px", color: "#7A9999", fontWeight: "bold", opacity: "60%" }}>
                            <span className="icon-tech" />
                            Metodologies
                        </h4>
                        <div className="project-techs">
                            {tech_label}
                            <div
                                className="flex-container-column"
                                style={{ marginTop: "82px", marginLeft: "70%", height: "32px", width: "80px" }}
                            >
                                <RejectButton onClick={this.onReject} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
