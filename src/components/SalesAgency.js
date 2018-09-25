import React, { Component } from "react";
import Modal from "./Modal/Modal";
import _ from "lodash";

import ReactBootstrapSlider from "react-bootstrap-slider";
import "../../node_modules/react-bootstrap-slider/src/css/bootstrap-slider.min.css";

import TeamDialog from "./TeamDialog";

import { roles } from "../game/knowledge/workers";
import { project_sizes } from "../game/knowledge/projects";
import { skills, skills_names } from "../game/knowledge/skills";
import { DefaultClickSoundButton } from "../game/knowledge/sounds";
import { colors } from "../game/knowledge/colors";

class SalesAgency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };

        let min = JSON.parse(JSON.stringify(skills));
        let max = JSON.parse(JSON.stringify(skills));

        _.keys(min).forEach(skill => {
            min[skill] = 0;
        });

        _.keys(max).forEach(skill => {
            max[skill] = 100;
        });

        let state = Object.assign(
            {
                deal_counter: 1,
                min_stats: JSON.parse(JSON.stringify(min)),
                max_stats: JSON.parse(JSON.stringify(max)),
                size: 1,
                modalOpen: false
            },
            this.props.data.sales_agency_state,
            { modalOpen: false }
        );

        this.state = state;

        this.calcCost = this.calcCost.bind(this);
        this.search = this.search.bind(this);
    }

    calcCost() {
        let s = this.state;

        let min_sum_factor = Math.floor(
            _.values(s.min_stats).reduce((sum, val) => {
                //return _.sum([sum, val*3]);
                return _.sum([sum, Math.pow(val, 1.3)]);
            }, 0)
        );

        let max_sum_factor = Math.floor(
            _.values(s.max_stats).reduce((sum, val) => {
                //return _.sum([sum, val*2]);
                return _.sum([sum, Math.pow(val, 1.2)]);
            }, 0)
        );

        let pike_factor1 = Math.floor((_.max(_.values(s.min_stats)) + _.max(_.values(s.max_stats))) / 2);
        let pike_factor2 = Math.floor((_.max(_.values(s.max_stats)) - _.min(_.values(s.max_stats))) / 2);

        let sum_control_factor = 0;
        skills_names.forEach(skill => {
            sum_control_factor += s.max_stats[skill] - s.min_stats[skill];
        });

        sum_control_factor = Math.floor(sum_control_factor / 10);

        // console.log(min_sum_factor, max_sum_factor, pike_factor1, pike_factor2, '/', sum_control_factor);

        return (
            420 +
            Math.floor(
                (Math.pow(s.size, 1.615) *
                    (1 + s.deal_counter / 10) *
                    (50 + min_sum_factor + max_sum_factor + pike_factor1 + pike_factor2)) /
                    (0.03 * (100 + sum_control_factor))
            )
        );
    }

    search() {
        let state = this.state;
        this.setState({ deal_counter: state.deal_counter++, modalOpen: false });
        this.props.data.helpers.contractSearch(state, this.calcCost());
        this.setState({ modalOpen: false });
    }

    openModal() {
        this.setState({ modalOpen: true });
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    render() {
        const data = this.props.data;

        const search_button = (
            <DefaultClickSoundButton
                className="btn btn-md btn-info hidden search"
                style={{ backgroundColor: `${colors.reputation.colorCompleted}` }}
                onClick={() => this.openModal()}
            >
                Search project
            </DefaultClickSoundButton>
        );

        const draw_row = (name, child) => {
            return (
                <div key={name} className="row">
                    <div className="col-md-2">{name}</div>
                    <div className="col-md-10 ">
                        <div style={{ padding: "18px" }}>{child}</div>
                    </div>
                </div>
            );
        };

        return (
            <div>
                {search_button}
                {this.state.modalOpen ? (
                    <Modal closeModal={() => this.closeModal()} showCloseButton={true}>
                        <div className="text-center">
                            <h3 className="text-center">Sales Agency</h3>
                            <p>Choose search criteria. Leave our sales manager leeway to reduce the cost of the search.</p>
                            {draw_row(
                                "Project Size",
                                <ReactBootstrapSlider
                                    value={this.state.size}
                                    change={e => {
                                        let size_data = project_sizes[e.target.value];
                                        let state = this.state;
                                        let new_state = {
                                            size: e.target.value,
                                            min_stats: {},
                                            max_stats: {}
                                        };

                                        let corridor = (min, value, max) => {
                                            return Math.max(min, Math.min(max, value));
                                        };

                                        _.keys(state.min_stats).forEach(skill => {
                                            new_state.min_stats[skill] = corridor(
                                                size_data.agency_min,
                                                state.min_stats[skill],
                                                size_data.agency_max
                                            ); //Math.max(project_sizes[e.target.value].agency_min, state.min_stats[skill]);
                                        });
                                        _.keys(state.max_stats).forEach(skill => {
                                            new_state.max_stats[skill] = corridor(
                                                size_data.agency_min,
                                                state.max_stats[skill],
                                                size_data.agency_max
                                            );
                                            //new_state.min_stats[skill] = Math.min(project_sizes[e.target.value].agency_max, state.max_stats[skill]);
                                        });

                                        this.setState(new_state);
                                    }}
                                    tooltip="hide"
                                    step={1}
                                    min={1}
                                    max={4}
                                    ticks={[1, 2, 3, 4]}
                                    ticks_labels={[
                                        project_sizes[1].alone_name,
                                        project_sizes[2].alone_name,
                                        project_sizes[3].alone_name,
                                        project_sizes[4].alone_name
                                    ]}
                                />
                            )}
                            {skills_names.map(skill => {
                                return draw_row(
                                    roles[skill].name,
                                    <ReactBootstrapSlider
                                        value={[this.state.min_stats[skill], this.state.max_stats[skill]]}
                                        change={e => {
                                            let state = this.state;
                                            state.min_stats[skill] = e.target.value[0];
                                            state.max_stats[skill] = e.target.value[1];
                                            this.setState(state);
                                        }}
                                        //scale='logarithmic'
                                        tooltip="always"
                                        step={1}
                                        min={project_sizes[this.state.size].agency_min}
                                        max={project_sizes[this.state.size].agency_max}
                                    />
                                );
                            })}
                            <DefaultClickSoundButton
                                className={this.calcCost() <= data.money ? "btn btn-success" : "btn btn-success disabled"}
                                onClick={() => {
                                    if (this.calcCost() <= data.money) {
                                        this.search();
                                    }
                                }}
                            >
                                Search {this.calcCost()}$
                            </DefaultClickSoundButton>
                        </div>
                        <div data-provide="slider" data-value={30} data-step={10} className="noUi-target noUi-ltr noUi-horizontal" />
                    </Modal>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default SalesAgency;
