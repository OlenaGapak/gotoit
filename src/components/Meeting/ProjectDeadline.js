import React, { PureComponent } from "react";
import classNames from "classnames";
import * as PropTypes from "prop-types";
import _ from "lodash";

export default class ProjectDeadline extends PureComponent {
    static propTypes = {
        deadline: PropTypes.number.isRequired,
        deadlineMax: PropTypes.number.isRequired
    };

    render() {
        return (
            <div key="deadline" className="row">
                <div className="col-md-2">Deadline</div>
                <div className="col-md-10 progress">
                    <div
                        className={classNames(
                            "progress-bar",
                            this.props.deadline / this.props.deadlineMax < 0.1 ? "bg-danger" : "bg-warning"
                        )}
                        role="progressbar"
                        style={{
                            width: _.round(100 - (this.props.deadline / this.props.deadlineMax) * 100, 0) + "%"
                        }}
                    >
                        {this.props.deadlineMax - this.props.deadline} hours
                    </div>
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                            width: _.round((this.props.deadline / this.props.deadlineMax) * 100, 0) + "%"
                        }}
                    >
                        {this.props.deadline} hours
                    </div>
                </div>
            </div>
        );
    }
}
