import React, { Component } from "react";
import * as PropTypes from "prop-types";

export class Statistics extends Component {
    static propTypes = {
        complexity: PropTypes.any,
        iteration: PropTypes.any,
        project: PropTypes.any
    };

    render() {
        return (
            <div className="flex-container-column">
                <div className="flex-element"> Iteration: {this.props.iteration} </div>
                <div className="flex-element">
                    Tasks: {this.props.project.tasksQuantity()}/{this.props.project.planedTasksQuantity()}{" "}
                </div>
                <div className="flex-element">
                    Bugs: <span className="text-danger">{this.props.project.bugsQuantity()}</span>
                </div>
                <div className="flex-element"> Complexity: {this.props.complexity} </div>
            </div>
        );
    }
}
