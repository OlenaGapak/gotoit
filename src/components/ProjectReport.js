import React, { Component } from "react";
import _ from "lodash";
import classNames from "classnames";

import StatsBar from "./StatsBar";
import { ProjectReward } from "../components/Projects/ProjectReward";
//import ChartsController from "../components/content/ChartsController";

import { technologies } from "../game/knowledge/technologies";
import { skills } from "../game/knowledge/skills";
class ProjectReport extends Component {
    render() {
        const data = this.props.data;
        const project = this.props.project;

        const stats_data = _.mapValues(skills, (stat, key) => {
            return {
                name: key, // _.capitalize(key[0]),
                val: (
                    <span>
                        <span className="text-warning">{project.needs(key)}</span>
                        {project.bugs[key] > 0 ? <span className="text-danger">+{project.bugs[key]}</span> : ""}/
                        <span>{project.estimate[key]}</span>
                    </span>
                )
            };
        });

        let label = (id, text) => {
            return (
                <span key={id} className="text-info small">
                    {" "}
                    {text}{" "}
                </span>
            );
        };

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
            if (worker.id in team_ids) {
                team.push(worker);
            }
        });
        const team_label = team.map(worker => {
            return label(worker.id, worker.name);
        });

        let tech = [];
        if (project.id in data.projects_technologies) {
            Object.keys(data.projects_technologies[project.id]).forEach(tech_name => {
                if (data.projects_technologies[project.id][tech_name]) {
                    tech.push(tech_name);
                }
            });
        }
        const tech_label = tech.map(tech_name => {
            return label(tech_name, technologies[tech_name].acronym);
        });

        return (
            <div className="">
                <div className="flex-container-row">
                    <h4
                        className="slim"
                        style={{
                            marginRight: "25%",
                            fontWeight: "bold",
                            fontSize: "24px",
                            textAlign: "center"
                        }}
                    >
                        {project.stage}
                        ed
                    </h4>
                    {project.deadline_max > 0 ? (
                        <div className="progress">
                            <div
                                className={classNames(
                                    "progress-bar",
                                    project.deadline / project.deadline_max < 0.1 ? "bg-danger" : "bg-warning"
                                )}
                                role="progressbar"
                                style={{
                                    width: 100 - (project.deadline / project.deadline_max) * 100 + "%"
                                }}
                            >
                                {project.deadline_max - project.deadline} gone
                            </div>
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{
                                    width: (project.deadline / project.deadline_max) * 100 + "%"
                                }}
                            >
                                {project.deadline} to deadline
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <p className="small">
                    With team {team_label}.{tech.length ? <span className="small"> and tech {tech_label}.</span> : " "}
                    {project.facts.money_spent ? `Spent ${project.facts.money_spent}$ for salary. ` : ""}
                    {project.facts.tasks_done ? `Did ${project.facts.tasks_done} tasks. ` : ""}
                    {project.facts.bugs_passed ? `Passed ${project.facts.bugs_passed} bugs. ` : ""}
                    {project.facts.refactored ? `Did ${project.facts.refactored} refactoring. ` : ""}
                    {project.facts.tests_wrote ? `Wrote ${project.facts.tests_wrote} tests. ` : ""}
                </p>
                <div className="flex-container-row">
                    <div className="flex-container-column" style={{ marginRight: "25%" }}>
                        <ProjectReward reward={project.reward} penalty={project.penalty} project={project} />
                    </div>
                    <div className="flex-container-column">
                        <StatsBar stats={stats_data} data={this.props.data} />
                        <div className="" style={{ marginRight: "8px" }}>
                            {" "}
                            Tasks: {project.tasksQuantity()}/{project.planedTasksQuantity()}{" "}
                        </div>
                        <div className="" style={{ marginRight: "8px" }}>
                            {" "}
                            Bugs: <span className="text-danger">{project.bugsQuantity()}</span>{" "}
                        </div>
                        <div className="" style={{ marginRight: "8px" }}>
                            {" "}
                            Complexity: {project.complexity}{" "}
                        </div>
                        <div className="" style={{ marginRight: "8px" }}>
                            {" "}
                            Iteration: {project.iteration}{" "}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectReport;
