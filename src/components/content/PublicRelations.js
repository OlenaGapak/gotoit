import React, { Component } from "react";
import { public_relations } from "../../game/knowledge/public_relations";
import { colors } from "../../game/knowledge/colors";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Bar from "../Bar/Bar";
import _ from "lodash";

class PublicRelations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            next_click_will_able_at: 0
        };
    }

    render() {
        const data = this.props.data;
        const rumor_bar = [
            {
                name: "Rumor",
                width: Math.min(100, data.rumor),
                color: colors.blue,
                value: Math.ceil(data.rumor * 100) / 100,
                id: "rumor"
            }
        ];
        const reputation_bar = [
            {
                name: "Reputation",
                width: Math.min(100, data.reputation),
                color: colors.orange,
                value: Math.ceil(data.reputation * 100) / 100,
                id: "reputation"
            }
        ];

        return (
            <div className="card border text-center">
                <div className="flex-container-row">
                    <div style={{ width: "47%", float: "left", margin: "5px" }}>
                        <div className="flex-container-row">
                            <div style={{ width: "25%" }}>
                                <CircularProgressbar
                                    initialAnimation={true}
                                    strokeWidth={6}
                                    styles={{
                                        path: { stroke: `${colors.blue}, ${Math.ceil(data.rumor * 100) / 100}` },
                                        text: { fill: `<h2>${colors.blue}</h2>` }
                                    }}
                                    percentage={Math.ceil(data.rumor * 100) / 100}
                                    text={`${Math.ceil(data.rumor * 100) / 100}%`}
                                />
                            </div>
                            <span className="flex-container-column" style={{ paddingLeft: "10px" }}>
                                <h3>Rumor</h3>
                                <h5>attracts new candidates to you</h5>
                            </span>
                        </div>
                        {/* <Bar bar_data={rumor_bar} /> */}
                        <button className="btn btn-success btn-md">Search candidate</button>
                    </div>
                    <div style={{ width: "47%", float: "right", margin: "5px" }}>
                        <div className="flex-container-row">
                            <div style={{ width: "25%" }}>
                                <CircularProgressbar
                                    initialAnimation={true}
                                    strokeWidth={6}
                                    styles={{
                                        path: { stroke: `${colors.orange}, ${Math.ceil(data.rumor * 100) / 100}` },
                                        text: { fill: `<h2>${colors.orange}</h2>` }
                                    }}
                                    percentage={Math.ceil(data.reputation * 100) / 100}
                                    text={`${Math.ceil(data.reputation * 100) / 100}%`}
                                />
                            </div>

                            <span className="flex-container-column" style={{ paddingLeft: "10px" }}>
                                <h3>Reputation</h3>
                                <h5>Attracts new projects to you</h5>
                            </span>
                        </div>
                        {/* <Bar bar_data={reputation_bar} /> */}
                    </div>
                </div>

                <div className="flex-container-row">
                    {_.map(public_relations, (item, key) => {
                        return (
                            <div className="card" style={{ margin: "20px", padding: "16px" }}>
                                <h6>{public_relations[key].name + " "}</h6>
                                <button
                                    className={public_relations[key].cost <= data.money ? "btn btn-info " : "btn btn-info disabled "}
                                    onClick={() => {
                                        public_relations[key].onClick(data);
                                    }}
                                >
                                    {public_relations[key].cost ? public_relations[key].cost + "$" : "Free"}
                                </button>

                                <div>
                                    {(() => {
                                        let effect = _.find(data.on_tick_effects, effect => {
                                            return effect.type === key;
                                        });
                                        return effect ? effect.click_count : 0;
                                    })()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default PublicRelations;
