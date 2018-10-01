import PropTypes from "prop-types";
import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { colors } from "../game/knowledge/colors";
import Bar from "./Bar/Bar";
import _ from "lodash";
import isEqual from "react-fast-compare";
class WorkerStaminaBar extends Component {
    static defaultProps = {
        stamina: 0
    };

    static propTypes = {
        stamina: PropTypes.number.isRequired
    };
    shouldComponentUpdate(nextProps) {
        return nextProps.stamina !== this.props.stamina;
    }
    state = {
        bar_data: []
    };
    static getDerivedStateFromProps(nextProps, prevstate) {
        let { stamina } = nextProps;
        if (stamina === prevstate.stamina) return false;
        return {
            bar_data: [
                {
                    name: "Stamina",
                    width: _.round(Math.min(100, stamina / 50)),
                    color: "#F26191",
                    value: `${Math.floor(stamina / 50)}%`,
                    showName: true
                },
                {
                    name: "empty",
                    width: _.round(100 - Math.min(100, stamina / 50)),
                    color: "#993D5C",
                    value: "",
                    showName: false
                }
            ]
        };
    }
    render() {
        let { bar_data } = this.state;
        return <Bar className="stamina-bar" bar_data={bar_data} />;
    }
}

export default WorkerStaminaBar;
