import React, { Component } from "react";
import _ from "lodash";

import ProjectReport from "../ProjectReport";
import ProjectsTop from "../../services/ProjectsTop";

import { project_kinds, project_platforms } from "../../game/knowledge/projects";
import { skills_names } from "../../game/knowledge/skills";
import ProjectName from "../Projects/ProjectName";
import { Avatar } from "../Projects/Avatar";

import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

class ProjectEndScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //   end_screen_project: null
        };
    }

    render() {
        const data = this.props.data;
        let project = this.props.letter.object;

        let all_top_handler = ProjectsTop.getHandler(data.simplified_reports);
        let platform_top_handler = all_top_handler.filter("platform", project.platform);
        let kind_top_handler = all_top_handler.filter("kind", project.kind);
        let platform_kind_top_handler = all_top_handler.filter("platform", project.platform).filter("kind", project.kind);

        return (
            <div>
                <div className="analytics-modal">
                    <div className="modal-header">
                        <div className="flex-element col-3">
                            <Avatar
                                sources={_.toPairs(project.avatar)}
                                style={{ height: "144px", width: "144px" }}
                                className="project-avatar-big"
                            />
                        </div>
                    </div>
                    <div className="modal-message">
                        {/* <ChartsController data={this.props.data} chart={{ name: "Projects archive statistics", type: "Archive" }} /> */}
                        <div className="text-center">
                            <p className="title">
                                <ProjectName
                                    project={project}
                                    name={project.name}
                                    size={project.size}
                                    platform={project.platform}
                                    kind={project.kind}
                                />
                            </p>
                            <ProjectReport key={project.id} project={project} data={this.props.data} />
                            <h3 style={{ marginTop: "34px" }}>Project Top Score</h3>
                            <div className="flex-container-row text-center" style={{ marginTop: "14px" }}>
                                <div className="flex-container-column">
                                    <h2>All Project Top: {all_top_handler.getTopNumber(project.id)}</h2>
                                    {skills_names.map(skill => (
                                        <div key={skill} className="flex-container-column">
                                            {skill} top: {all_top_handler.getTopNumber(project.id, skill)}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex-container-column">
                                    <h3>
                                        {project_platforms[project.platform].name} Top: {platform_top_handler.getTopNumber(project.id)}
                                    </h3>
                                    {skills_names.map(skill => (
                                        <div key={skill} className="">
                                            {skill} top: {platform_top_handler.getTopNumber(project.id, skill)}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex-container-column">
                                    <h3>
                                        {project_kinds[project.kind].name} Top: {kind_top_handler.getTopNumber(project.id)}
                                    </h3>
                                    {skills_names.map(skill => (
                                        <div key={skill} className="flex-container-column">
                                            {skill} top: {kind_top_handler.getTopNumber(project.id, skill)}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-container-column">
                                    <h3>
                                        {project_platforms[project.platform].name} {project_kinds[project.kind].name} Top:{" "}
                                        {platform_kind_top_handler.getTopNumber(project.id)}
                                    </h3>
                                    {skills_names.map(skill => (
                                        <div key={skill} className="flex-container-column">
                                            {skill} top: {platform_kind_top_handler.getTopNumber(project.id, skill)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectEndScreen;
