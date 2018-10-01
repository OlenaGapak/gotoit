import React, { Component } from "react";
import { colors } from "../../game/knowledge/colors";
import Bar from "../Bar/Bar";
import _ from "lodash";
class ProjectDeadlineBar extends Component {
    render() {
        let { project } = this.props;
        let bar_data = [
            {
                name: "gone",
                width: _.round(100 - (project.deadline / project.deadline_max) * 100, 0),
                color: project.deadline / project.deadline_max < 0.1 ? colors.danger : colors.warning,
                value: _.round(project.deadline_max - project.deadline, 0),
                showName: true
            },
            {
                name: "days to deadline",
                width: _.round((project.deadline / project.deadline_max) * 100, 0),
                color: colors.success,
                value: _.round(project.deadline, 0),
                showName: true
            }
        ];
        return project.type !== "own" ? <Bar className="deadline-bar" bar_data={bar_data} /> : " ";
    }
}

ProjectDeadlineBar.propTypes = {};

export default ProjectDeadlineBar;
