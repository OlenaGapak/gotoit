import React, { Component } from "react";
import { public_relations } from "../../game/knowledge/public_relations";
import { colors } from "../../game/knowledge/colors";
import Bar from "../Bar/Bar";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import HiringAgency from "../HiringAgency";
import SalesAgency from "../SalesAgency";

//import Bar from "../Bar/Bar";
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

        return (
            <div className="text-center" style={{ backgroundColor: "Transparent" }}>
                <div className="card flex-container-row card-content-center">
                    <div className="flex-container-column" style={{ padding: "24px" }}>
                        <div className="flex-element flex-container-row">
                            <div style={{ width: "45%" }}>
                                <CircularProgressbar
                                    className="skills-circle"
                                    initialAnimation={true}
                                    strokeWidth={6}
                                    styles={{
                                        path: { stroke: `${colors.rumor.colorCompleted}` },
                                        text: { fill: `${colors.rumor.colorCompleted}`, fontSize: "34px", fontWeight: "bold" },
                                        trail: { stroke: `${colors.rumor.colorTrail}` }
                                    }}
                                    percentage={Math.ceil(data.rumor * 100) / 100}
                                    text={`${(Math.ceil(data.rumor * 100) / 100).toFixed(0)}%`}
                                />
                            </div>
                            <span className="circle-text">
                                <h3>Rumor</h3>
                                <h5>Attracts new candidates to you</h5>
                            </span>
                        </div>

                        <div className="flex-element">
                            <HiringAgency data={data} />
                        </div>
                    </div>
                    <div className="flex-container-column" style={{ padding: "24px" }}>
                        <div className="flex-element flex-container-row">
                            <div style={{ width: "45%" }}>
                                <CircularProgressbar
                                    className="skills-circle"
                                    initialAnimation={true}
                                    strokeWidth={6}
                                    styles={{
                                        path: { stroke: `${colors.reputation.colorCompleted}` },
                                        text: { fill: `${colors.reputation.colorCompleted}`, fontSize: "34px", fontWeight: "bold" },
                                        trail: { stroke: `${colors.reputation.colorTrail}` }
                                    }}
                                    percentage={Math.ceil(data.reputation * 100) / 100}
                                    text={`${(Math.ceil(data.reputation * 100) / 100).toFixed(0)}%`}
                                />
                            </div>

                            <span className="circle-text">
                                <h3>Reputation</h3>
                                <h5>Attracts new projects to you</h5>
                            </span>
                        </div>

                        <div className="flex-element">
                            <SalesAgency data={data} />
                        </div>
                    </div>
                </div>

                <div className="flex-container-row pr-actions" style={{ textAlign: "center" }}>
                    <div className="flex-element" style={{ marginTop: "24px" }}>
                        {_.map(public_relations, (item, key) => {
                            return (
                                <div className="card" style={{ margin: "10px", padding: "16px 16px 16px 16px", maxWidth: "250px" }}>
                                    <h6>{public_relations[key].name + " "}</h6>
                                    <h7 style={{ fontSize: "9px", lineHeight: "11px", marginBottom: "10px" }}>
                                        {public_relations[key].tooltip}
                                    </h7>
                                    <div className="btn-wrapper">
                                        <DefaultClickSoundButton
                                            className={
                                                public_relations[key].cost <= data.money ? "btn btn-success " : "btn btn-success disabled "
                                            }
                                            onClick={() => {
                                                public_relations[key].onClick(data);
                                            }}
                                        >
                                            {public_relations[key].cost ? public_relations[key].cost + "$" : "Free"}
                                        </DefaultClickSoundButton>

                                        <span>
                                            Duration:
                                            {public_relations[key].long / (24 * 7) === 1
                                                ? public_relations[key].long / (24 * 7) + " week"
                                                : public_relations[key].long / (24 * 7) > 1
                                                    ? public_relations[key].long / (24 * 7) + " weeks"
                                                    : public_relations[key].long / 24 === 1
                                                        ? public_relations[key].long / 24 + " day"
                                                        : public_relations[key].long / 24 + " days"}
                                        </span>

                                        <span>
                                            {(() => {
                                                let effect = _.find(data.on_tick_effects, effect => {
                                                    return effect.type === key;
                                                });
                                                return effect ? effect.click_count : 0;
                                            })()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicRelations;
