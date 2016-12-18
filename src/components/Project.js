import React, { Component } from 'react';
import Portal from 'react-portal';
import _ from 'lodash';
import classNames from 'classnames';

import TeamDialog from './TeamDialog';
import StatsBar from './StatsBar';

import {skills_names, skills, technologies} from '../data/knowledge';


class Project extends Component {
    constructor(props) {
        super(props);
        this.manage = this.manage.bind(this);
        this.manageAll = this.manageAll.bind(this);
        this.changeTechnology = this.changeTechnology.bind(this);
        this.finish = this.finish.bind(this);
        this.fix = this.fix.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        this.refs.manage.openPortal();
    }

    manage(event) {
        this.props.data.helpers.modifyRelation(event.target.id, this.props.project.id, event.target.checked);
    }

    manageAll(event) {
        this.props.data.helpers.modifyRelation(null, this.props.project.id, event.target.checked);
    }

    changeTechnology(event) {
        this.props.data.helpers.changeTechnology(event.target.id, this.props.project.id, event.target.checked);
    }

    close() {
        this.props.data.helpers.closeProject(this.props.project.id);
    }

    fix() {
        this.props.data.helpers.fixProject(this.props.project.id);
    }

    finish() {
        this.props.data.helpers.finishProject(this.props.project.id);
    }

    render() {
        const data = this.props.data;
        const project = this.props.project;

        const stats_data = _.mapValues(skills, (stat, key) => {
            return {name: key, // _.capitalize(key[0]),
                val:
                    <span>
                        <span>{project.needs[key]}</span>
                        {project.errors[key] > 0 ? <span>+{project.errors[key]}</span> : ''}
                        /<span>{project.needs_max[key]}</span>
                    </span>
            };
        });

        const manage_button = <button className="btn">Manage</button>;

        let label = (id, text) => { return <span key={id}> <label className="label-default">{text}</label> </span>; };

        let team_ids = {};
        _.keys(data.relations).forEach((worker_id) => {
            let worker_projects = data.relations[worker_id];
            _.keys(worker_projects).forEach((project_id) => {
                let relation = worker_projects[project_id];
                if (relation && project_id === project.id) {
                    team_ids[worker_id] = true;
                }
            })
        });
        let team = [];
        data.workers.forEach((worker) => {
            if (worker.id in team_ids) { team.push(worker); }
        });
        const team_label = team.map((worker) => { return label(worker.id, worker.name); });

        let tech = [];
        if (project.id in data.projects_technologies) {
            Object.keys(data.projects_technologies[project.id]).forEach((tech_name) => {
                if (data.projects_technologies[project.id][tech_name]) {
                    tech.push(tech_name);
                }
            });
        }
        const tech_label = tech.map((tech_name) => { return label(tech_name, technologies[tech_name].acronym); });

        let tmp = '';
        if (project.isFinished()) {
            if (project.isFixed()) {
                tmp = <button className="small" onClick={this.finish}>Finish Project</button>;
            }
            else {
                tmp = <button className="small" onClick={this.fix}>Fix Bugs</button>;
            }
        }
        else {
            tmp = <button className="small btn-danger" onClick={this.close}>Reject Project!</button>;
        }
        const finish_button = tmp;

        const deadline = project.getDeadlineText();

        return (
            <div className="unit_block">
                {project.name} ({project.reward}$) {deadline}

                <Portal ref="manage" closeOnEsc closeOnOutsideClick openByClickOn={manage_button}>
                    <TeamDialog>
                        <h4> {project.name} {project.reward}$ {deadline}</h4>
                        <div className="flex-container-row">
                            <div className="flex-element"> Tasks: {project.tasksQuantity()}/{project.planedTasksQuantity()} </div>
                            <div className="flex-element"> Bugs: {project.bugsQuantity()} </div>
                            <div className="flex-element"> Complexity: {project.complexity} </div>
                            <div className="flex-element"> Iteration: {project.iteration} </div>
                        </div>
                        <div>
                            {project.deadline > 0 ? <div key="tests" className="row">
                                <div className="col-md-1">Deadline</div>
                                <div className="col-md-10 progress">
                                    <div className={classNames('progress-bar', (project.deadline / project.deadline_max < 0.1 ? 'progress-bar-danger' : 'progress-bar-warning'))} role="progressbar"
                                         style={{width: (100-(project.deadline / project.deadline_max * 100))+'%'}}>
                                        <label>{project.deadline_max - project.deadline} hours</label>
                                    </div>
                                    <div className="progress-bar progress-bar-success" role="progressbar"
                                         style={{width: (project.deadline / project.deadline_max * 100)+'%'}}>
                                        <label>{project.deadline} hours</label>
                                    </div>
                                </div>
                            </div> : ''}
                            {skills_names.map((skill) => {

                                let need = project.needs[skill];
                                let errors = project.errors[skill];
                                var max = project.needs_max[skill];
                                let diff = max - need - errors;

                                let sum = need + errors + diff;

                                let tasks = need / sum * 100;
                                let bugs = errors / sum * 100;
                                let done = (diff / sum * 100)-0.1;
                              //  let done = Math.max(0, (Math.floor(100-tasks-bugs)));

                                return <div key={skill} className="row">
                                    <div className="col-md-1">{skill}</div>
                                    <div className="col-md-10 progress">
                                        <div className="progress-bar progress-bar-warning" role="progressbar"
                                                style={{width: tasks+'%'}}>
                                            {need ? <label>{need} tasks</label> : ''}
                                        </div>
                                        <div className="progress-bar progress-bar-danger" role="progressbar"
                                                 style={{width: bugs+'%'}}>
                                            {errors ? <label>{errors} bugs</label> : ''}
                                        </div>
                                        <div className="progress-bar progress-bar-success" role="progressbar"
                                                 style={{width: done+'%'}}>
                                            {(diff) ? <label>{diff} done</label> : ''}
                                        </div>
                                    </div>
                                </div>;
                            })}
                            {project.tests > 0 ? <div key="tests" className="row">
                                <div className="col-md-1">tests</div>
                                <div className="col-md-10 progress">
                                    <div className="progress-bar progress-bar-warning" role="progressbar"
                                         style={{width: (100-(project.tests / project.planedTasksQuantity() * 100))+'%'}}>
                                        <label>{project.planedTasksQuantity()-project.tests} tasks</label>
                                    </div>
                                    <div className="progress-bar progress-bar-success" role="progressbar"
                                         style={{width: (project.tests / project.planedTasksQuantity() * 100)+'%'}}>
                                        <label>{project.tests} done</label>
                                    </div>
                                </div>
                            </div> : ''}
                        </div>
                        <h4>Project Technologies</h4>
                        <div>
                            Which technologies should be used on {project.name} project?
                            <ul>
                                {Object.keys(technologies).map((technology, i) =>
                                    <li key={technology}>
                                        <input
                                            type="checkbox"
                                            id={technology}
                                            checked={data.helpers.getTechnology(project.id, technology)}
                                            onChange={this.changeTechnology}/>
                                        <span> {technologies[technology].name} </span>
                                        <span className="small"> {technologies[technology].description} </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <h4>Project Team</h4>
                        <div>
                            Who will work on {project.name} project?
                            <input type="checkbox" onChange={this.manageAll}/>All
                            <ul>
                                {this.props.data.workers.map((worker, i) =>
                                    <li key={worker.id + project.id}>
                                        <input
                                            type="checkbox"
                                            id={worker.id || ''}
                                            checked={data.helpers.getRelation(worker.id, project.id)}
                                            onChange={this.manage}/>
                                        {worker.name}
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            {finish_button}
                        </div>
                    </TeamDialog>
                </Portal>

                {project.deadline > 0 ?
                    <div className="progress">
                        <div className={classNames('progress-bar', (project.deadline / project.deadline_max < 0.1 ? 'progress-bar-danger' : 'progress-bar-warning'))} role="progressbar"
                             style={{width: (100-(project.deadline / project.deadline_max * 100))+'%'}}>
                            <label>{project.deadline_max - project.deadline} gone</label>
                        </div>
                        <div className="progress-bar progress-bar-success" role="progressbar"
                             style={{width: (project.deadline / project.deadline_max * 100)+'%'}}>
                            <label>{project.deadline} to deadline</label>
                        </div>
                    </div> : ''}

                {(() => {
                    let errors = project.bugsQuantity();
                    let need = project.tasksQuantity();
                    var max = project.planedTasksQuantity();
                    let diff = max - need - errors;

                    let sum = need + errors + diff;

                    let tasks = need / sum * 100;
                    let bugs = errors / sum * 100;
                    let done = (diff / sum * 100)-0.1;

                    return <div className="progress">
                        <div className="progress-bar progress-bar-warning" role="progressbar"
                             style={{width: tasks+'%'}}>
                            {need ? <label>{need} tasks</label> : ''}
                        </div>
                        <div className="progress-bar progress-bar-danger" role="progressbar"
                             style={{width: bugs+'%'}}>
                            {errors ? <label>{errors} bugs</label> : ''}
                        </div>
                        <div className="progress-bar progress-bar-success" role="progressbar"
                             style={{width: done+'%'}}>
                            {(diff) ? <label>{diff} done</label> : ''}
                        </div>
                    </div>;
                })()}

                <StatsBar stats={stats_data} data={this.props.data} />

                <div className="flex-container-row">
                    <div className="flex-element"> Tasks: {project.tasksQuantity()}/{project.planedTasksQuantity()} </div>
                    <div className="flex-element"> Bugs: {project.bugsQuantity()} </div>
                    <div className="flex-element"> Complexity: {project.complexity} </div>
                    <div className="flex-element"> Iteration: {project.iteration} </div>
                </div>

                <div className="small">
                    <p className="small">Team: {team_label}</p>
                    {tech.length ? <p className="small">Tech: {tech_label}</p> : ''}
                </div>
            </div>
        );
    }
}

export default Project;
