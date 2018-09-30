import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import { colors } from "../../game/knowledge/colors";
import Bar from "../Bar/Bar";
import _ from "lodash";
export default class Deadline extends PureComponent {
    static propTypes = {
        deadline: PropTypes.number,
        deadlineMax: PropTypes.number
    };

    render() {
        let { deadline, deadlineMax } = this.props;
        if (deadline <= 0 || deadlineMax <= 0 || deadline === Number.POSITIVE_INFINITY) return null;

        const bar_data = [
            {
                name: "gone",
                width: _.round(100 - (deadline / deadlineMax) * 100, 0),
                color: deadline / deadlineMax < 0.1 ? colors.danger : colors.warning,
                value: _.round(deadlineMax - deadline, 0),
                showName: true
            },
            {
                name: "to deadline",
                width: _.round((deadline / deadlineMax) * 100, 0),
                color: colors.success,
                value: _.round(deadline, 0),
                showName: true
            }
        ];

        return (
            <div key="deadline" className="flex-container-row">
                <div className="flex-element">Deadline</div>
                <Bar bar_data={bar_data} />
            </div>
        );
    }
}
