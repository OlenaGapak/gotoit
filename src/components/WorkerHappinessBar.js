import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import Bar from "./Bar/Bar";
import _ from "lodash";
import isEqual from "react-fast-compare";
class WorkerHappinessBar extends PureComponent {
    // shouldComponentUpdate(nextProps) {
    //     return !isEqual(this.props, nextProps);
    // }
    static defaultProps = {
        happiness_real: 0
    };

    static propTypes = {
        happiness_real: PropTypes.number.isRequired
    };
    shouldComponentUpdate(nextProps) {
        return nextProps.happiness_real !== this.props.happiness_real;
    }
    state = {
        bar_data: []
    };
    static getDerivedStateFromProps(nextProps, prevstate) {
        let { happiness_real } = nextProps;
        if (happiness_real === prevstate.happiness_real) return false;
        return {
            bar_data: [
                {
                    name: "Happiness",
                    width: _.round(happiness_real, 0),
                    color: "#81CC52",
                    value: _.round(happiness_real, 0) + "%",
                    showName: true
                },
                {
                    name: "empty",
                    width: _.round(100 - happiness_real, 0),
                    color: "#61993D",
                    value: "",
                    showName: false
                }
            ]
        };
    }
    render() {
        let { bar_data } = this.state;
        return <Bar className="happiness-bar" bar_data={bar_data} />;
    }
}

WorkerHappinessBar.propTypes = {};

export default WorkerHappinessBar;
