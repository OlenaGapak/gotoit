import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";

export class ProjectReward extends PureComponent {
    static propTypes = {
        penalty: PropTypes.number,
        reward: PropTypes.number
    };

    render() {
        let { reward, penalty } = this.props;
        return (
            <span>
                Reward:{" "}
                <div style={{ fontSize: "18px" }}>
                    {reward}$
                    {penalty > 0 && (
                        <span>
                            {" "}
                            Penalty: -{penalty}${" "}
                            <span className="icon-usd-penalty" style={{ paddingLeft: "4px" }}>
                                <span className="path1" />
                                <span className="path2" />
                            </span>{" "}
                        </span>
                    )}
                    <span className="icon-usd" style={{ paddingLeft: "4px" }}>
                        <span className="path1" />
                        <span className="path2" />
                    </span>
                </div>
            </span>
        );
    }
}
