import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Animate } from "react-move";
import { easeLinear } from "d3-ease";
import { Motion, spring } from "react-motion";
import SplashAnimated from "./SplashAnimated";
import { sounds } from "../../game/knowledge/sounds";
import { easeExpInOut } from "d3-ease";
class BubbleAnimated extends PureComponent {
    static propTypes = {
        color: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        from: PropTypes.string.isRequired,
        handleTransitionEnd: PropTypes.func.isRequired,
        size: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        let { size, color } = props;
        let from = { x: 0, y: 0 };
        let elementFrom = document.getElementById(props.from);
        let elementTo = document.getElementById(props.to);
        this.state = {
            elementFrom,
            elementTo
        };
        if (elementFrom) {
            from = elementFrom.getBoundingClientRect();
            this.state = {
                ...this.state,
                step: 1,
                duration: 600 - 50,
                size,
                color,
                opacity: 1,
                scale: 1,
                x: from.x + 50,
                y: from.y + 50
            };
        }
    }
    transitionEnd = () => {
        this.props.handleTransitionEnd();
    };
    movingEnd = () => {
        let { step } = this.state;
        return this.props.handleTransitionEnd();
    };
    componentDidMount() {
        let to;
        let { elementFrom, elementTo } = this.state;
        let audio = new Audio(sounds.bubble_appear);
        audio.play();
        if (elementTo) {
            to = elementTo.getBoundingClientRect();
            to.x -= to.width / 2;
            to.y -= to.height / 2;
            this.setState({
                x: to.x,
                y: to.y
            });
        }
    }
    componentWillUnmount() {
        let audio = new Audio(sounds.bubble_burst);
        audio.play();
    }
    render() {
        let { count } = this.props;
        let { size, color, x, y, elementFrom, elementTo, opacity, scale, duration } = this.state;
        if (!elementFrom || !elementTo) return null;
        return (
            <div>
                {
                    <Animate
                        start={{
                            x: x,
                            y: y,
                            opacity: 1,
                            scale: 1
                            // duration: 700 - 50 * this.props.gameSpeed
                        }}
                        update={[
                            {
                                x: [x],
                                y: [y],
                                timing: {
                                    duration: 500
                                    // easy: easeExpInOut
                                    // easy: easeCubicIn
                                }
                                // events: {
                                // end: this.movingEnd
                                // }
                            },
                            {
                                opacity: [0],
                                scale: [2],
                                timing: {
                                    delay: 500,
                                    duration: 500
                                },
                                events: {
                                    end: this.movingEnd
                                }
                            }
                        ]}
                        // enter={{
                        //     x: [x],
                        //     y: [y],
                        //
                        //     timing: {
                        //         duration: [600],
                        //         ease: easeExpInOut
                        //     }
                        //     // events: { end: this.movingEnd }
                        // }}
                        leave={[
                            // an array!
                            {
                                x: x,
                                y: y,
                                opacity: [1],
                                scale: 3,
                                timing: {
                                    duration: 1000,
                                    ease: easeExpInOut
                                }
                            }
                        ]}
                    >
                        {({ x, y, opacity, scale }) => {
                            return (
                                <div
                                    className="bubbles-item"
                                    style={{
                                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                                        opacity: opacity,
                                        width: size,
                                        height: size,
                                        background: color
                                    }}
                                >
                                    {count}
                                </div>
                            );
                        }}
                    </Animate>
                }
            </div>
        );
    }
}

export default BubbleAnimated;
