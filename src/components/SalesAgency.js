import React, { Component } from 'react';
import Portal from 'react-portal';
import _ from 'lodash';

import ReactBootstrapSlider from 'react-bootstrap-slider';

import TeamDialog from './TeamDialog';

import {skills_names, roles, skills, project_sizes} from '../data/knowledge';


class SalesAgency extends Component {
    constructor(props) {
        super(props);

        let min = JSON.parse(JSON.stringify(skills));
        _.keys(min).forEach((skill) => {
            min[skill] = 1;
        });
        let max = JSON.parse(JSON.stringify(skills));
        _.keys(max).forEach((skill) => {
            max[skill] = 100;
        });

        this.state = Object.assign({
            min_stats: JSON.parse(JSON.stringify(min)),
            max_stats: JSON.parse(JSON.stringify(max)),
            size: 1
        }, this.props.data.sales_agency_state);

        this.calcCost = this.calcCost.bind(this);
        this.search = this.search.bind(this);
    }

    calcCost() {
        let s = this.state;

        let min_sum_factor = Math.floor(_.values(s.min_stats).reduce((sum, val) => {
            //return _.sum([sum, val*3]);
            return _.sum([sum, Math.pow(val, 1.5)]);
        }, 0));
        let max_sum_factor = Math.floor(_.values(s.max_stats).reduce((sum, val) => {
            //return _.sum([sum, val*2]);
            return _.sum([sum, Math.pow(val, 1.4)]);
        }, 0));

        let pike_factor1 = Math.floor((_.max(_.values(s.min_stats)) + _.max(_.values(s.max_stats))) / 2 );
        let pike_factor2 = Math.floor((_.max(_.values(s.max_stats)) - (_.min(_.values(s.max_stats)))) / 2);


        let sum_control_factor = 0;
        skills_names.forEach((skill) => {
            sum_control_factor += s.max_stats[skill] - s.min_stats[skill];
        });
        sum_control_factor = Math.floor(sum_control_factor / 2);

       // console.log(min_sum_factor, max_sum_factor, pike_factor1, pike_factor2, '/', sum_control_factor);

        return 153 + Math.floor((Math.pow(s.size, 1.615) * (50 + min_sum_factor + max_sum_factor + pike_factor1 + pike_factor2))
            / (0.01 * (50  + sum_control_factor)));
    }

    search() {
        this.props.data.helpers.contractSearch(this.state, this.calcCost());
        this.refs.agency.closePortal();
    }

    render() {
        const data = this.props.data;

        const search_button = <button className="btn btn-info">Sales Agency</button>;

        const draw_row = (name, child) => {
            return <div key={name} className="row">
                <div className="col-md-2">{name}</div>
                <div className="col-md-10 ">
                    <div style={{padding: '18px'}}>
                        {child}
                    </div>
                </div>
            </div>
        };

        return (
            <Portal ref="agency" closeOnEsc openByClickOn={search_button}>
                <TeamDialog>
                    <div className="text-center">
                        <h3 className="text-center">Sales Agency</h3>
                        <p>
                            Choose search criteria. Leave our sales manager leeway to reduce the cost of the search.
                        </p>
                        {draw_row('Project Size', <ReactBootstrapSlider
                            value={this.state.size}
                            change={(e) => { this.setState({size: e.target.value}); }}
                            tooltip='hide'
                            step={1}
                            min={1}
                            max={4}
                            ticks={[1, 2, 3, 4]}
                            ticks_labels={[project_sizes[1].alone_name, project_sizes[2].alone_name, project_sizes[3].alone_name, project_sizes[4].alone_name]}
                        />)}
                        {skills_names.map((skill) => {
                            return draw_row(roles[skill].name, <ReactBootstrapSlider
                                        value={[this.state.min_stats[skill], this.state.max_stats[skill]]}
                                        change={(e) => {
                                            let state = this.state;
                                            state.min_stats[skill] = e.target.value[0];
                                            state.max_stats[skill] = e.target.value[1];
                                            this.setState(state);
                                        }}
                                        //scale='logarithmic'
                                        tooltip='always'
                                        step={1}
                                        max={1000}
                                        min={1}/>)
                        })}
                        <button className={this.calcCost() <= data.money ? "btn btn-success" : "btn btn-success disabled"} onClick={() => { if (this.calcCost() <= data.money) { this.search() } }}>Search {this.calcCost()}</button>
                    </div>
                </TeamDialog>
            </Portal>
        );
    }
}

export default SalesAgency;