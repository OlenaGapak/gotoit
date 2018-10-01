import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { Avatar } from "./Avatar";
import _ from "lodash";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";
import isEqual from "react-fast-compare";

export class WorkerButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarHovered: false
        };
    }
    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }
    render() {
        return (
            <DefaultClickSoundButton
                className="btn btn-worker"
                onClick={this.props.action}
                onMouseOver={() => {
                    this.setState({ avatarHovered: true });
                }}
                onMouseOut={() => {
                    this.setState({ avatarHovered: false });
                }}
            >
                <Avatar className="worker-avatar" name={this.props.name} sources={_.toPairs(this.props.avatar)} />
                <span className={`${this.state.avatarHovered ? "icon-close" : ""}`} />
            </DefaultClickSoundButton>
        );
    }
}

WorkerButton.propTypes = {
    id: PropTypes.any,
    action: PropTypes.func,
    name: PropTypes.any
};
