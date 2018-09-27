import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";

export class ProjectReward extends PureComponent {
    static propTypes = {
        penalty: PropTypes.number,
        reward: PropTypes.number
    };

    render() {
        let { reward, penalty, project } = this.props;

        return (
            <div style={{ display: "flex", paddingTop: "20px" }}>
                <div>
                    <div>
                        <h6
                            style={{
                                fontWeight: "bold",
                                color: "rgba(0, 51, 51, 0.6)",
                                fontSize: "11px",
                                lineHeight: "13px"
                            }}
                        >
                            {project.type === "own" ? "Estimated reward" : "Reward"}
                        </h6>
                    </div>
                    <div style={{ display: "flex" }}>
                        <h3
                            style={{
                                color: "#71B247",
                                fontWeight: "bold",
                                fontSize: "18px",
                                lineHeight: "25px",
                                marginRight: "4px"
                            }}
                        >
                            {reward}
                        </h3>
                        <span className="icon-usd">
                            <span className="path1" />
                            <span className="path2" />
                        </span>
                    </div>
                </div>
                <div style={{ width: "24px" }} />
                {penalty > 0 && (
                    <div>
                        <div>
                            <h6
                                style={{
                                    fontWeight: "bold",
                                    color: "rgba(0, 51, 51, 0.6)",
                                    fontSize: "11px",
                                    lineHeight: "13px"
                                }}
                            >
                                Penalty
                            </h6>
                        </div>
                        <div style={{ display: "flex" }}>
                            <h3
                                style={{
                                    color: "#7A9999",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    lineHeight: "25px",
                                    marginRight: "4px"
                                }}
                            >
                                {`-${penalty}`}
                            </h3>
                            <span className="icon-usd-penalty">
                                <span className="path1" />
                                <span className="path2" />
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
