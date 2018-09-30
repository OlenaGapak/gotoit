import React, { Component } from "react";
import "../../../node_modules/react-bootstrap-slider/src/css/bootstrap-slider.min.css";

import _ from "lodash";

import ProjectModel from "../../models/ProjectModel";

import { project_kinds, project_platforms } from "../../game/knowledge/projects";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";
import { other_asset } from "../../game/knowledge/worker_avatar";
import StatsProgressBar from "../StatsProgressBar";
import { colors } from "../../game/knowledge/colors";

const platformSVG = require.context("../../assets/images/project/platforms/", true, /^\.\/.*\.svg$/);
const kindSVG = require.context("../../assets/images/project/kind/", true, /^\.\/.*\.svg$/);

class StartProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_workers: {},
            project_name: "",
            project_platform: "desktop",
            project_kind: "application"
        };
    }

    componentDidMount() {
        const data = this.props.data;
        const workers = _.map(data.workers, "id");
        const workers_true = {}; // _.mapValues(workers, () => { return true; });
        _.each(workers, worker_id => {
            workers_true[worker_id] = true;
        });

        console.log(workers, workers_true);
        this.setState({
            selected_workers: workers_true,
            project_name: ProjectModel.genName(),
            project_platform: "desktop",
            project_kind: "application"
        });
        console.log("on open");
    }

    render() {
        let state = this.state;
        const data = this.props.data;

        return (
            <div>
                <h3 className="text-center">Start Project</h3>
                <div className="row filement">
                    <div className="slim col-md-12">
                        <div className="row start-project-name">
                            <label htmlFor="project-name">
                                <h4>{"Project name: "}</h4>
                            </label>
                            <input
                                type="text"
                                id="project-name"
                                className="form-inline"
                                value={this.state.project_name}
                                onChange={event => {
                                    this.setState({ project_name: event.target.value });
                                }}
                            />
                        </div>
                        <div className="row">
                            <div className="card text-center col-md-4">
                                <h4 className="text-center">Project platform</h4>
                                {this.props.data.projects_unlocked_platforms.map((platform, i) => {
                                    return (
                                        <div className="start-project-platform-select" key={i}>
                                            <input
                                                className="form-check-input"
                                                id={platform + "-radio-DefaultClickSoundButton"}
                                                type="radio"
                                                name="platform"
                                                value={platform}
                                                checked={this.state.project_platform === platform}
                                                onChange={e => {
                                                    this.setState({
                                                        project_platform: e.target.value
                                                    });
                                                }}
                                            />
                                            <label
                                                className="form-check-label btn btn-sm"
                                                htmlFor={platform + "-radio-DefaultClickSoundButton"}
                                            >
                                                <img alt={state.project_name + " avatar"} src={platformSVG(`./${platform}.svg`)} />
                                                {platform}
                                            </label>
                                        </div>
                                    );
                                })}
                                <p className="filament">{project_platforms[this.state.project_platform].description}</p>
                            </div>
                            <div className="card text-center col-md-4">
                                <h4 className="text-center">Project type</h4>
                                {Object.keys(project_kinds).map((kind, i) => {
                                    return (
                                        <div className="start-project-kind-select" key={i}>
                                            <input
                                                className="form-check-input"
                                                id={kind + "-radio-DefaultClickSoundButton"}
                                                type="radio"
                                                name="kinds"
                                                value={kind}
                                                checked={this.state.project_kind === kind}
                                                onChange={e => {
                                                    this.setState({
                                                        project_kind: e.target.value
                                                    });
                                                }}
                                            />
                                            <label
                                                className="form-check-label btn btn-sm"
                                                htmlFor={kind + "-radio-DefaultClickSoundButton"}
                                            >
                                                <img alt={state.project_name + " kind"} src={kindSVG(`./${kind}.svg`)} />

                                                {kind}
                                            </label>
                                        </div>
                                    );
                                })}
                                <p className="filament">{project_kinds[this.state.project_kind].description}</p>
                            </div>
                            <div className="card text-center col-md-4">
                                <h4 className="text-center">Workers on project</h4>
                                {this.props.data.workers.map(worker => {
                                    const stats_progressbar_data = _.mapValues(worker.stats, (val, stat) => {
                                        return {
                                            name: stat,
                                            value: worker.getStatsData(stat),
                                            color: colors[stat].colorCompleted
                                        };
                                    });

                                    return (
                                        <span className="start-project-workers-list" key={worker.id}>
                                            <input
                                                type="checkbox"
                                                id={worker.id || 0}
                                                checked={this.state.selected_workers[worker.id] || false}
                                                onChange={event => {
                                                    let state = JSON.parse(JSON.stringify(this.state));
                                                    state.selected_workers[worker.id] = event.target.checked;
                                                    this.setState(state);
                                                }}
                                            />{" "}
                                            <div className="flex-container-column">
                                                <div className="flex-element">{worker.name}</div>
                                                <div className="worker-skills flex-element">
                                                    <StatsProgressBar
                                                        type={"design"}
                                                        max_stat={data.max_stat}
                                                        stats={stats_progressbar_data}
                                                        worker={worker}
                                                        data={data}
                                                        stat_icon={true}
                                                        getRole={this.props.data.helpers.getRole}
                                                        changeRole={this.props.data.helpers.changeRole}
                                                    />

                                                    <StatsProgressBar
                                                        type={"program"}
                                                        max_stat={data.max_stat}
                                                        stats={stats_progressbar_data}
                                                        worker={worker}
                                                        data={data}
                                                        stat_icon={true}
                                                        getRole={this.props.data.helpers.getRole}
                                                        changeRole={this.props.data.helpers.changeRole}
                                                    />

                                                    <StatsProgressBar
                                                        type={"manage"}
                                                        max_stat={data.max_stat}
                                                        stats={stats_progressbar_data}
                                                        worker={worker}
                                                        data={data}
                                                        hideStatIcon={true}
                                                        getRole={this.props.data.helpers.getRole}
                                                        changeRole={this.props.data.helpers.changeRole}
                                                    />
                                                </div>
                                            </div>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <DefaultClickSoundButton
                        className="btn btn-success btn-lg"
                        onClick={() => {
                            this.props.data.helpers.startProject(
                                this.state.project_name,
                                this.state.selected_workers,
                                this.state.project_platform,
                                this.state.project_kind
                            );
                        }}
                    >
                        Start Project
                    </DefaultClickSoundButton>
                </div>
            </div>
        );
    }
}

export default StartProject;
