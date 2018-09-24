import React, { Component } from "react";
import ReactDOM from "react-dom";
import Bar from "./Bar/Bar";
import ReactTooltip from "react-tooltip";
//import PropTypes from 'prop-types';
//import _ from "lodash";
//import {roles, skills_names} from "../game/knowledge";

class StatsProgressBar extends Component {
    constructor(props) {
        super(props);

        this.changeRole = this.changeRole.bind(this);
    }
    changeRole(event) {
        this.props.data.helpers.changeRole(this.props.worker.id, event.target.id, event.target.checked);
    }
    render() {
        const stats = this.props.stats;
        const worker = this.props.worker;
        const type = this.props.type;
        const hideCheckbox = this.props.hideCheckbox;
        const max_stat = this.props.max_stat;
        const hideStatIcon = this.props.hideStatIcon;
        let bar_data = {};
        let stat = "default";
        switch (type) {
            case "design":
                stat = "design";
                bar_data = {
                    name: stat,
                    value: parseInt(stats[stat].value, 10),
                    width: (parseInt(stats[stat].value, 10) / max_stat) * 100,
                    color: stats[stat].color,
                    showName: true
                };
                break;
            case "program":
                stat = "program";
                bar_data = {
                    name: stat,
                    value: parseInt(stats[stat].value, 10),
                    width: (parseInt(stats[stat].value, 10) / max_stat) * 100,
                    color: stats[stat].color,
                    showName: true
                };
                break;
            case "manage":
                stat = "manage";
                bar_data = {
                    name: stat,
                    value: parseInt(stats[stat].value, 10),
                    width: (parseInt(stats[stat].value, 10) / max_stat) * 100,
                    color: stats[stat].color,
                    showName: true
                };
                break;
            default:
                break;
        }

        console.log(hideStatIcon);

        return (
            <label data-tip data-for={"progress_skill_" + stat} className="stats-progress-bar">
                <>
                    <input
                        className={"custom-checkbox icon-" + stat}
                        type="checkbox"
                        id={stat}
                        checked={this.props.data.helpers.getRole(worker.id, stat)}
                        onChange={this.changeRole}
                    />
                    {hideStatIcon ? "" : <span className={"icon-" + stat} />}
                </>
                <ReactTooltip id={"progress_skill_" + stat}>
                    <span>{`${stat}: ${stats[stat].value}`}</span>
                </ReactTooltip>
                <Bar bar_data={[bar_data]} />
            </label>
        );
    }
}

StatsProgressBar.propTypes = {};

export default StatsProgressBar;
