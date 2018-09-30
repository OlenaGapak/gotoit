import React, { Component } from "react";
import { project_bars } from "../../game/knowledge/projects";
import { colors } from "../../game/knowledge/colors";
import Bar from "../Bar/Bar";
import _ from "lodash";
import isEqual from "react-fast-compare";
class ProjectProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    render() {
        let project = this.props.project;
        let sum_design, sum_prog, sum_manage;
        let design_data, prog_data, manage_data;
        let own_modal = this.props.own_modal;
        if (project.type === "own") {
            sum_design = project.done.design + project.bugs.design;
            design_data = [
                {
                    name: "Design bugs",
                    width: _.round((100 / sum_design) * project.bugs.design, 0),
                    color: colors.design.colorBug,
                    value: _.round(project.bugs.design, 0),
                    id: project.id + project_bars.design_bugs.id
                },
                {
                    name: "Design completed",
                    width: _.round((100 / sum_design) * project.done.design, 0),
                    color: colors.design.colorCompleted,
                    value: _.round(project.done.design, 0),
                    id: project.id + project_bars.design_completed.id
                }
            ];
            sum_prog = project.done.program + project.bugs.program;
            prog_data = [
                {
                    name: "Program bugs",
                    width: _.round((100 / sum_prog) * project.bugs.program, 0),
                    color: colors.program.colorBug,
                    value: _.round(project.bugs.program, 0),
                    id: project.id + project_bars.program_bugs.id
                },
                {
                    name: "Program completed",
                    width: _.round((100 / sum_prog) * project.done.program, 0),
                    color: colors.program.colorCompleted,
                    value: _.round(project.done.program, 0),
                    id: project.id + project_bars.program_completed.id
                }
            ];
            sum_manage = project.done.manage + project.bugs.manage;
            manage_data = [
                {
                    name: "Manage bugs",
                    width: _.round((100 / sum_manage) * project.bugs.manage, 0),
                    color: colors.manage.colorBug,
                    value: _.round(project.bugs.manage, 0),
                    id: project.id + project_bars.manage_bugs.id
                },
                {
                    name: "Manage completed",
                    width: _.round((100 / sum_manage) * project.done.manage, 0),
                    color: colors.manage.colorCompleted,
                    value: _.round(project.done.manage, 0),
                    id: project.id + project_bars.manage_completed.id
                }
            ];
        } else {
            sum_design = project.done.design + project.bugs.design + (project.estimate.design - project.done.design);

            design_data = [
                {
                    name: "Design tasks",
                    width: _.round((100 / sum_design) * (project.estimate.design - project.done.design), 0),
                    color: colors.design.colorEstimate,
                    value: _.round(project.estimate.design - project.done.design, 0),
                    id: project.id + project_bars.design_tasks.id
                },
                {
                    name: "Design bugs",
                    width: _.round((100 / sum_design) * project.bugs.design, 0),
                    color: colors.design.colorBug,
                    value: _.round(project.bugs.design, 0),
                    id: project.id + project_bars.design_bugs.id
                },
                {
                    name: "Design completed",
                    width: _.round((100 / sum_design) * project.done.design, 0),
                    color: colors.design.colorCompleted,
                    value: _.round(project.done.design, 0),
                    id: project.id + project_bars.design_completed.id
                }
            ];
            sum_prog = project.done.program + project.bugs.program + (project.estimate.program - project.done.program);

            prog_data = [
                {
                    name: "Program tasks",
                    width: _.round((100 / sum_prog) * (project.estimate.program - project.done.program), 0),
                    color: colors.program.colorEstimate,
                    value: _.round(project.estimate.program - project.done.program, 0),
                    id: project.id + project_bars.program_tasks.id
                },
                {
                    name: "Program bugs",
                    width: _.round((100 / sum_prog) * project.bugs.program, 0),
                    color: colors.program.colorBug,
                    value: _.round(project.bugs.program, 0),
                    id: project.id + project_bars.program_bugs.id
                },
                {
                    name: "Program completed",
                    width: _.round((100 / sum_prog) * project.done.program),
                    color: colors.program.colorCompleted,
                    value: _.round(project.done.program, 0),
                    id: project.id + project_bars.program_completed.id
                }
            ];
            sum_manage = project.done.manage + project.bugs.manage + (project.estimate.manage - project.done.manage);
            manage_data = [
                {
                    name: "Manage tasks",
                    width: _.round((100 / sum_manage) * (project.estimate.manage - project.done.manage), 0),
                    color: colors.manage.colorEstimate,
                    value: _.round(project.estimate.manage - project.done.manage, 0),
                    id: project.id + project_bars.manage_tasks.id
                },
                {
                    name: "Manage bugs",
                    width: _.round((100 / sum_manage) * project.bugs.manage, 0),
                    color: colors.manage.colorBug,
                    value: _.round(project.bugs.manage, 0),
                    id: project.id + project_bars.manage_bugs.id
                },
                {
                    name: "Manage completed",
                    width: _.round((100 / sum_manage) * project.done.manage, 0),
                    color: colors.manage.colorCompleted,
                    value: _.round(project.done.manage, 0),
                    id: project.id + project_bars.manage_completed.id
                }
            ];
        }

        return (
            <div className="project-progress-bar">
                {prog_data[0].value !== 0 ? (
                    <div className="flexbox">
                        <span className={`icon-program ${own_modal ? "icon-program-own" : ""}`} id={`${project.id}_program`} />
                        <Bar className="flex-grow" bar_data={prog_data} own_modal={own_modal} />
                    </div>
                ) : (
                    ""
                )}
                {design_data[0].value !== 0 ? (
                    <div className="flexbox">
                        <span className={`icon-design ${own_modal ? "icon-design-own" : ""}`} id={`${project.id}_design`} />
                        <Bar className="flex-grow" bar_data={design_data} own_modal={own_modal} />
                    </div>
                ) : (
                    ""
                )}
                {manage_data[0].value !== 0 ? (
                    <div className="flexbox">
                        <span className={`icon-manage ${own_modal ? "icon-manage-own" : ""}`} id={`${project.id}_manage`} />
                        <Bar className="flex-grow" bar_data={manage_data} own_modal={own_modal} />
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default ProjectProgressBar;
