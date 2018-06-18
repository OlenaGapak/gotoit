import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../css/Timeline.css';
import {project_kinds, project_platforms} from "../game/knowledge";

const timelineWidth = 600;


class Timeline extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let { timelineEvents, timelineScale } = this.props.data;

        return (
            <div className='col-md-6 slim timeline'>
                <div className='line'>
                    <div style={{ position: 'absolute', height: 10,
                        width: 3, background: 'red', marginLeft: timelineWidth/2, zIndex: 10 }}>
                        <p style={{ position: 'absolute', bottom: 1}}>Now</p>
                    </div>
                    {
                        _.map(timelineScale, (day, index) => {
                                let events = timelineEvents.filter( (item) => {
                                    if (day.getDate() === item.time.getDate() && day.getMonth() === item.time.getMonth()) {
                                        return true
                                    } else return false
                                });
                                return (
                                    <div style={{
                                        marginLeft: timelineWidth/(timelineScale.length-1) * index+ 'px',
                                        display: 'inline-block',
                                        position: 'absolute',
                                        height: 6,
                                        width: 2,
                                        background: 'black'
                                    }}>
                                        <div style={{ position: 'absolute'}}>
                                            {day.getDate()}
                                        </div>

                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px'}}>
                                        {
                                            _.map(events, (item) => {
                                                if (item.type === 'deadline') {
                                                    return (

                                                        <OverlayTrigger key={index} delay={150} placement="bottom"
                                                                        overlay={
                                                                            <Tooltip id={`Tooltip${index}`}>
                                                                                <div>
                                                                                    {item.info + ': ' + item.object.name}
                                                                                </div>
                                                                            </Tooltip>
                                                                        }>
                                                            <div style={{ position: 'relative', bottom: '18px' }}>
                                                                <div style={{border: '1px solid red', position: 'absolute'}}>
                                                                    <img alt={item.object.name + ' platform'} src={require(`../../public/${project_platforms[item.object.platform].name}.svg`)}
                                                                         width={20} height={20}/>
                                                                </div>
                                                                <div style={{ position: 'absolute' }}>
                                                                    <img alt={item.object.name + ' kind'} src={require(`../../public/${project_kinds[item.object.kind].name}.svg`)}
                                                                         width={20} height={20}/>
                                                                </div>
                                                            </div>
                                                        </OverlayTrigger>

                                                    )
                                                } else if (item.type === 'vacation' || item.type === 'leave'){
                                                    return (
                                                        <OverlayTrigger key={index} delay={150} placement="bottom"
                                                            overlay={
                                                                <Tooltip id={`Tooltip${index}`}>
                                                                    <div>
                                                                        {item.info + ': ' + item.object.name}
                                                                    </div>
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <img style={{
                                                                    border: '1px solid red',
                                                                    width: 20,
                                                                    height: 20
                                                                }}
                                                                src={item.object.avatar}
                                                            />
                                                        </OverlayTrigger>
                                                    )
                                                } else return null

                                            })

                                        }
                                        </div>

                                    </div>
                                )
                            }

                        )
                    }
                </div>

            </div>
        );
    }
}

Timeline.propTypes = {
};

export default Timeline;
