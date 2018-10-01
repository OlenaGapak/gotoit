import React, { Component } from "react";
import classNames from "classnames";
import * as PropTypes from "prop-types";
import _ from "lodash";

export default class ProgressDeadline extends Component {
    static propTypes = {
        deadline: PropTypes.number,
        deadlineMax: PropTypes.number
    };

    render() {
        return (
            <div className="progress">
                <div
                    className={classNames("progress-bar", this.props.deadline / this.props.deadlineMax < 0.1 ? "bg-danger" : "bg-warning")}
                    role="progressbar"
                    style={{
                        width: _.round(100 - (this.props.deadline / this.props.deadlineMax) * 100, 0) + "%"
                    }}
                >
                    {this.props.deadlineMax - this.props.deadline} gone
                </div>
                <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                        width: _.round((this.props.deadline / this.props.deadlineMax) * 100, 0) + "%"
                    }}
                >
                    {this.props.deadline} to deadline
                </div>
            </div>
        );
    }
}
