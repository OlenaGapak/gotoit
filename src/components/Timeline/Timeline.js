import PropTypes from "prop-types";
import React, { Component } from "react";
import _ from "lodash";
import { TimeLineStep } from "./TimeLineStep";
import isEqual from "react-fast-compare";

const timelineWidth = window.innerWidth;

class Timeline extends Component {
    static propTypes = {
        data: PropTypes.shape()
    };
    // shouldComponentUpdate(nextProps) {
    //     return !isEqual(this.props, nextProps);
    // }
    render() {
        let { timelineEvents = [], timelineScale } = this.props.data;

        return (
            <div className="timeline-wrapper">
                <div className="col-12 timeline">
                    <div className="line">
                        <div className="now" style={{ marginLeft: timelineWidth / 2 }} />
                        {_.map(timelineScale, (day, index) => {
                            let events = timelineEvents.filter(item => {
                                if (day.getDate() === item.time.getDate() && day.getMonth() === item.time.getMonth()) {
                                    return true;
                                } else return false;
                            });
                            return <TimeLineStep key={index} index={index} length={timelineScale.length} day={day} events={events} />;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Timeline;
