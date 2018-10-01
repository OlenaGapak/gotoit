import PropTypes from "prop-types";
import React, { Component } from "react";
import { project_sizes } from "../../game/knowledge/projects";
import _ from "lodash";
import isEqual from "react-fast-compare";

class ProjectName extends Component {
    static defaultProps = {
        size: 0
    };

    static propTypes = {
        //deadlineText: PropTypes.string,
        kind: PropTypes.string,
        name: PropTypes.string,
        penalty: PropTypes.number,
        platform: PropTypes.string,
        reward: PropTypes.number,
        size: PropTypes.number
    };
    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }
    render() {
        const { size, platform, kind, name, deadlineText } = this.props;
        return (
            <div className="project-name flex-grow">
                <h2>{name}</h2>
                <span className="project-desription">
                    {project_sizes[size].name} {platform} {kind}
                </span>
                {/*<span className="project-deadline">{_.values(deadlineText)}</span>*/}
                {this.props.children}
            </div>
        );
    }
}

export default ProjectName;
