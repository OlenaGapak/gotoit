import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Bar from "./Bar/Bar";
import ReactTooltip from "react-tooltip";
//import PropTypes from 'prop-types';
//import _ from "lodash";
//import {roles, skills_names} from "../game/knowledge";
import _ from "lodash";
import isEqual from "react-fast-compare";
class StatsProgressBar extends Component {
    static propTypes = {
        changeRole: PropTypes.func,
        data: PropTypes.any,
        getRole: PropTypes.func,
        max_stat: PropTypes.number,
        stats: PropTypes.string,
        type: PropTypes.string,
        workerId: PropTypes.string
    };

    state = {
        bar_data: {},
        stat: "default"
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        let bar_data;
        let stat;
        const stats = nextProps.stats;
        const type = nextProps.type;

        const max_stat = nextProps.max_stat;
        switch (type) {
            case "design":
                stat = "design";
                bar_data = {
                    name: stat,
                    value: _.round(parseInt(stats[stat].value, 10), 0),
                    width: _.round((parseInt(stats[stat].value, 10) / max_stat) * 100, 0),
                    color: stats[stat].color,
                    showName: true
                };
                break;
            case "program":
                stat = "program";
                bar_data = {
                    name: stat,
                    value: _.round(parseInt(stats[stat].value, 10), 0),
                    width: _.round((parseInt(stats[stat].value, 10) / max_stat) * 100, 0),
                    color: stats[stat].color,
                    showName: true
                };
                break;
            case "manage":
                stat = "manage";
                bar_data = {
                    name: stat,
                    value: _.round(parseInt(stats[stat].value, 10), 0),
                    width: _.round((parseInt(stats[stat].value, 10) / max_stat) * 100, 0),
                    color: stats[stat].color,
                    showName: true
                };
                break;
            default:
                break;
        }
        return {
            bar_data,
            stat
        };
    }
    constructor(props) {
        super(props);

        this.changeRole = this.changeRole.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }
    changeRole(event) {
        this.props.changeRole(this.props.workerId, event.target.id, event.target.checked);
    }
    render() {
        let { stat, bar_data } = this.state;
        const stats = this.props.stats;
        const { workerId, getRole } = this.props;

        return (
            <label data-tip data-for={"progress_skill_" + stat} className="stats-progress-bar">
                <>
                    <input
                        className={"custom-checkbox icon-" + stat}
                        type="checkbox"
                        id={stat}
                        checked={getRole(workerId, stat)}
                        onChange={this.changeRole}
                    />
                    <span className={"icon-" + stat} />
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
